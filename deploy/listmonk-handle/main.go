package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"
)

var (
	listmonkAPI     string
	listmonkUser    string
	listmonkPass    string
	turnstileSecret string
	listIDs         []int

	turnstileVerifyURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

	turnstileClient = &http.Client{Timeout: 10 * time.Second}
	listmonkClient  = &http.Client{Timeout: 10 * time.Second}
)

const maxBodyBytes = 4 << 10

// parseListIDs parses a comma-separated list of positive integer list IDs.
func parseListIDs(s string) ([]int, error) {
	var ids []int
	for _, part := range strings.Split(s, ",") {
		id, err := strconv.Atoi(strings.TrimSpace(part))
		if err != nil || id < 1 {
			return nil, fmt.Errorf("invalid list ID %q", part)
		}
		ids = append(ids, id)
	}
	return ids, nil
}

// parseOrigins parses a comma-separated list of origins, dropping empty entries.
func parseOrigins(s string) []string {
	var origins []string
	for _, part := range strings.Split(s, ",") {
		if o := strings.TrimSpace(part); o != "" {
			origins = append(origins, o)
		}
	}
	return origins
}

type ListmonkSubscriberRequest struct {
	Email  string `json:"email"`
	Name   string `json:"name"`
	Status string `json:"status"`
	Lists  []int  `json:"lists"`
}

type SubscriptionRequest struct {
	Email        string `json:"email"`
	CaptchaToken string `json:"captchaToken"`
}

type TurnstileResponse struct {
	Success bool `json:"success"`
}

func verifyCaptcha(token string) bool {
	resp, err := turnstileClient.PostForm(turnstileVerifyURL,
		url.Values{"secret": {turnstileSecret}, "response": {token}})
	if err != nil {
		fmt.Println("Error verifying CAPTCHA:", err)
		return false
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading CAPTCHA verification response:", err)
		return false
	}

	var tr TurnstileResponse
	err = json.Unmarshal(body, &tr)
	if err != nil {
		fmt.Println("Error unmarshaling CAPTCHA verification response:", err)
		return false
	}

	return tr.Success
}

func addSubscriberToListmonk(email string) error {
	subscriberData := ListmonkSubscriberRequest{
		Email:  email,
		Name:   "Subscriber",
		Status: "enabled",
		Lists:  listIDs,
	}

	data, err := json.Marshal(subscriberData)
	if err != nil {
		fmt.Println("Error marshaling subscriber data:", err)
		return err
	}

	req, err := http.NewRequest("POST", listmonkAPI, bytes.NewBuffer(data))
	if err != nil {
		fmt.Println("Error creating request to listmonk:", err)
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.SetBasicAuth(listmonkUser, listmonkPass)

	resp, err := listmonkClient.Do(req)
	if err != nil {
		return fmt.Errorf("sending request to listmonk: %w", err)
	}
	defer resp.Body.Close()

	// 409: the subscriber already exists. Report success so the endpoint
	// does not reveal which addresses are subscribed.
	if resp.StatusCode == http.StatusConflict {
		return nil
	}
	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(io.LimitReader(resp.Body, 1024))
		return fmt.Errorf("listmonk responded %d: %s", resp.StatusCode, body)
	}

	fmt.Println("Subscriber added to listmonk successfully")
	return nil
}

func handleSubscribe(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)
	var sr SubscriptionRequest
	err := json.NewDecoder(r.Body).Decode(&sr)
	if err != nil {
		var tooBig *http.MaxBytesError
		if errors.As(err, &tooBig) {
			http.Error(w, "Request body too large", http.StatusRequestEntityTooLarge)
			return
		}
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if sr.CaptchaToken == "" {
		http.Error(w, "Captcha token is required", http.StatusBadRequest)
		return
	}

	if !verifyCaptcha(sr.CaptchaToken) {
		writeMessage(w, http.StatusUnauthorized, "Invalid CAPTCHA")
		return
	}

	if err := addSubscriberToListmonk(sr.Email); err != nil {
		// Detail stays in the server log; the client gets a fixed body.
		log.Printf("subscribe failed: %v", err)
		writeMessage(w, http.StatusInternalServerError, "Subscription failed")
		return
	}

	writeMessage(w, http.StatusOK, "Subscription successful")
}

func writeMessage(w http.ResponseWriter, status int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"message": msg})
}

func corsMiddleware(next http.HandlerFunc, allowedOrigins []string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		// Check if the origin is in the list of allowed origins
		for _, allowedOrigin := range allowedOrigins {
			if origin == allowedOrigin {
				w.Header().Set("Access-Control-Allow-Origin", origin)
				break
			}
		}

		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {
	listmonkAPI = os.Getenv("LISTMONK_API")
	listmonkUser = os.Getenv("LISTMONK_USER")
	listmonkPass = os.Getenv("LISTMONK_PASS")
	turnstileSecret = os.Getenv("TURNSTILE_SECRET")

	if listmonkAPI == "" || listmonkUser == "" || listmonkPass == "" || turnstileSecret == "" {
		log.Fatal(
			"Environment variables LISTMONK_API, LISTMONK_USER, LISTMONK_PASS, and TURNSTILE_SECRET must be set.",
		)
	}

	ids, err := parseListIDs(os.Getenv("LISTMONK_LIST_IDS"))
	if err != nil {
		log.Fatalf("Environment variable LISTMONK_LIST_IDS must be comma-separated positive integers: %v", err)
	}
	listIDs = ids

	allowedOrigins := parseOrigins(os.Getenv("ALLOWED_ORIGINS"))

	mux := http.NewServeMux()
	mux.HandleFunc("/api/subscribe", corsMiddleware(handleSubscribe, allowedOrigins))
	srv := &http.Server{
		Addr:              ":8080",
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}
