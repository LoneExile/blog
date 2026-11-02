package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"sync/atomic"
	"testing"
)

func TestParseListIDs(t *testing.T) {
	good := map[string][]int{"3": {3}, " 3, 5 ": {3, 5}}
	for in, want := range good {
		got, err := parseListIDs(in)
		if err != nil || !reflect.DeepEqual(got, want) {
			t.Errorf("parseListIDs(%q) = %v, %v; want %v", in, got, err, want)
		}
	}
	for _, in := range []string{"", "abc", "0", "-1", "3,"} {
		if got, err := parseListIDs(in); err == nil {
			t.Errorf("parseListIDs(%q) = %v, nil; want error", in, got)
		}
	}
}

func TestParseOrigins(t *testing.T) {
	got := parseOrigins("https://a.example, https://b.example")
	want := []string{"https://a.example", "https://b.example"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v, want %v", got, want)
	}
	if got := parseOrigins(""); len(got) != 0 {
		t.Errorf("empty input gave %v", got)
	}
}

type fakes struct {
	turnstileCalls, listmonkCalls atomic.Int32
}

// setup wires fake Turnstile and listmonk servers into the package vars.
func setup(t *testing.T, turnstileOK bool, onTurnstile, onListmonk func(*http.Request)) *fakes {
	t.Helper()
	f := &fakes{}
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		f.turnstileCalls.Add(1)
		if onTurnstile != nil {
			onTurnstile(r)
		}
		json.NewEncoder(w).Encode(map[string]bool{"success": turnstileOK})
	}))
	lm := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		f.listmonkCalls.Add(1)
		if onListmonk != nil {
			onListmonk(r)
		}
		w.Write([]byte(`{}`))
	}))
	t.Cleanup(ts.Close)
	t.Cleanup(lm.Close)
	turnstileVerifyURL = ts.URL
	listmonkAPI = lm.URL
	listmonkUser = "blog-subscribe"
	listmonkPass = "tok"
	turnstileSecret = "sekret"
	listIDs = []int{3}
	return f
}

func post(h http.HandlerFunc, body string) *httptest.ResponseRecorder {
	rec := httptest.NewRecorder()
	h(rec, httptest.NewRequest("POST", "/api/subscribe", strings.NewReader(body)))
	return rec
}

func TestSubscribeSendsConfiguredLists(t *testing.T) {
	f := setup(t, true,
		func(r *http.Request) {
			r.ParseForm()
			if r.PostForm.Get("secret") != "sekret" || r.PostForm.Get("response") != "tkn" {
				t.Errorf("turnstile form = %v", r.PostForm)
			}
		},
		func(r *http.Request) {
			u, p, ok := r.BasicAuth()
			if !ok || u != "blog-subscribe" || p != "tok" {
				t.Errorf("basic auth = %q %q %v", u, p, ok)
			}
			var got map[string]any
			json.NewDecoder(r.Body).Decode(&got)
			want := map[string]any{"email": "a@example.com", "name": "Subscriber", "status": "enabled", "lists": []any{float64(3)}}
			if !reflect.DeepEqual(got, want) {
				t.Errorf("listmonk body = %v", got)
			}
		})
	rec := post(handleSubscribe, `{"email":"a@example.com","captchaToken":"tkn"}`)
	if rec.Code != 200 || strings.TrimSpace(rec.Body.String()) != `{"message":"Subscription successful"}` {
		t.Errorf("got %d %q", rec.Code, rec.Body.String())
	}
	if f.listmonkCalls.Load() != 1 {
		t.Errorf("listmonk calls = %d", f.listmonkCalls.Load())
	}
}

func TestSubscribeRejectsBadCaptcha(t *testing.T) {
	f := setup(t, false, nil, nil)
	rec := post(handleSubscribe, `{"email":"a@example.com","captchaToken":"bad"}`)
	if rec.Code != 401 || strings.TrimSpace(rec.Body.String()) != `{"message":"Invalid CAPTCHA"}` {
		t.Errorf("got %d %q", rec.Code, rec.Body.String())
	}
	if f.listmonkCalls.Load() != 0 {
		t.Errorf("listmonk called %d times", f.listmonkCalls.Load())
	}
}

func TestSubscribeRequiresToken(t *testing.T) {
	f := setup(t, true, nil, nil)
	rec := post(handleSubscribe, `{"email":"a@example.com"}`)
	if rec.Code != 400 {
		t.Errorf("code = %d", rec.Code)
	}
	if f.turnstileCalls.Load() != 0 || f.listmonkCalls.Load() != 0 {
		t.Errorf("upstream calls: turnstile=%d listmonk=%d", f.turnstileCalls.Load(), f.listmonkCalls.Load())
	}
}

func TestCORSAllowsOnlyListedOrigins(t *testing.T) {
	f := setup(t, true, nil, nil)
	h := corsMiddleware(handleSubscribe, []string{"https://blog.example"})

	do := func(method, origin string) *httptest.ResponseRecorder {
		rec := httptest.NewRecorder()
		req := httptest.NewRequest(method, "/api/subscribe", strings.NewReader(`{"email":"a@example.com","captchaToken":"t"}`))
		req.Header.Set("Origin", origin)
		h(rec, req)
		return rec
	}

	if got := do("POST", "https://blog.example").Header().Get("Access-Control-Allow-Origin"); got != "https://blog.example" {
		t.Errorf("allowed origin header = %q", got)
	}
	if got := do("POST", "https://evil.example").Header().Get("Access-Control-Allow-Origin"); got != "" {
		t.Errorf("foreign origin header = %q", got)
	}
	before := f.listmonkCalls.Load()
	rec := do("OPTIONS", "https://blog.example")
	if rec.Code != 200 || f.listmonkCalls.Load() != before {
		t.Errorf("preflight code=%d, listmonk calls changed=%v", rec.Code, f.listmonkCalls.Load() != before)
	}
}
