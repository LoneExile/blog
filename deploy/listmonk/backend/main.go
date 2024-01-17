package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type Subscriber struct {
	Email   string                 `json:"email"`
	Name    string                 `json:"name"`
	Status  string                 `json:"status"`
	Lists   []int                  `json:"lists"`
	Attribs map[string]interface{} `json:"attribs"`
}

type TurnstileResponse struct {
	Success bool `json:"success"`
}

func handleSubscribe(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var sub Subscriber
	if err := json.NewDecoder(r.Body).Decode(&sub); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	turnstileToken := r.Header.Get("X-Turnstile-Token")
	if !validateTurnstileToken(turnstileToken, turnstileSecret) {
		http.Error(w, "Invalid CAPTCHA.", http.StatusBadRequest)
		return
	}

	if !addSubscriberToListmonk(sub, listmonkAPI, listmonkUser, listmonkPass) {
		http.Error(w, "Failed to add subscriber to Listmonk.", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Subscriber added successfully")
}

func validateTurnstileToken(token string, turnstileSecret string) bool {
	data := fmt.Sprintf(`secret=%s&response=%s`, turnstileSecret, token)
	resp, err := http.Post(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		"application/x-www-form-urlencoded",
		bytes.NewBufferString(data),
	)
	if err != nil {
		log.Println("Failed to validate Turnstile token:", err)
		return false
	}
	defer resp.Body.Close()

	var tr TurnstileResponse
	if err := json.NewDecoder(resp.Body).Decode(&tr); err != nil {
		log.Println("Failed to decode Turnstile response:", err)
		return false
	}

	return tr.Success
}

func addSubscriberToListmonk(
	sub Subscriber,
	listmonkAPI string,
	listmonkUser, listmonkPass string,
) bool {
	subData, err := json.Marshal(sub)
	if err != nil {
		log.Println("Failed to marshal subscriber data:", err)
		return false
	}

	client := &http.Client{}
	req, err := http.NewRequest("POST", listmonkAPI, bytes.NewBuffer(subData))
	if err != nil {
		log.Println("Failed to create Listmonk request:", err)
		return false
	}

	req.SetBasicAuth(listmonkUser, listmonkPass)
	req.Header.Add("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		log.Println("Failed to send request to Listmonk:", err)
		return false
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		log.Printf("Listmonk API returned status %d: %s\n", resp.StatusCode, string(body))
		return false
	}

	return true
}

func main() {
	// listmonkAPI := os.Getenv("LISTMONK_API")
	// listmonkUser := os.Getenv("LISTMONK_USER")
	// listmonkPass := os.Getenv("LISTMONK_PASS")
	// turnstileSecret := os.Getenv("TURNSTILE_SECRET")

	// if listmonkAPI == "" || listmonkUser == "" || listmonkPass == "" || turnstileSecret == "" {
	// 	log.Fatal(
	// 		"Environment variables LISTMONK_API, LISTMONK_USER, LISTMONK_PASS, and TURNSTILE_SECRET must be set.",
	// 	)
	// }

	http.HandleFunc("/api/subscribe", handleSubscribe)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
