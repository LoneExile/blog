import { useEffect, useState } from "preact/hooks";

declare global {
  interface Window {
    onloadTurnstileCallback: any;
  }
}

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isTurnstileReady, setTurnstileReady] = useState(false);

  useEffect(() => {
    window.onloadTurnstileCallback = () => {
      setTurnstileReady(true);
      console.log("Turnstile is loaded and ready to go!");
    };

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!email || !turnstileToken) {
      console.log("Email or Turnstile token is missing");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          turnstileToken: turnstileToken,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement)?.value)}
        required
      />

      {isTurnstileReady && <div className="cf-turnstile" data-sitekey=""></div>}

      <button type="submit">Subscribe</button>
    </form>
  );
};

export default SubscriptionForm;
