import { Component } from "preact";

export default class SubscriptionForm extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
    script.defer = true;
    document.body.appendChild(script);
    // ----------------------------------------------------------------
    const subscribeButton = document.getElementById("subscribe");
    const subscribeDisabledButton =
      document.getElementById("subscribe-disabled");
    function toggleSubscribeButton() {
      const selectTurnstileToken = document.querySelector(
        'input[name="cf-turnstile-response"]',
      );
      const turnstileToken = (selectTurnstileToken as HTMLInputElement).value;
      if (turnstileToken && turnstileToken.trim() !== "") {
        (subscribeButton as HTMLElement).classList.remove("hidden");
        (subscribeDisabledButton as HTMLElement).classList.add("hidden");
      } else {
        (subscribeButton as HTMLElement).classList.add("hidden");
        (subscribeDisabledButton as HTMLElement).classList.remove("hidden");
      }
    }
    const targetNode = document.getElementById(
      "cf-turnstile-ele",
    ) as HTMLElement;
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList: any, _: any) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes") {
          if (mutation.attributeName === "value") {
            toggleSubscribeButton();
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    // ----------------------------------------------------------------
    document
      .getElementById("subscription-form")
      ?.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectEmail = document?.querySelector(
          'input[name="email"]',
        ) as HTMLInputElement;
        const email = selectEmail?.value;
        const selectTurnstileToken = document.querySelector(
          'input[name="cf-turnstile-response"]',
        ) as HTMLInputElement;
        const turnstileToken = selectTurnstileToken?.value;

        fetch(import.meta.env.PUBLIC_TURNSTILE_HANDLE_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            captchaToken: turnstileToken,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      });
    // ----------------------------------------------------------------
    const adjustTurnstileSize = () => {
      const turnstileContainer = document.querySelector(
        ".cf-turnstile",
      ) as HTMLElement;
      if (turnstileContainer) {
        if (window.innerWidth < 600) {
          turnstileContainer.setAttribute("data-size", "compact");
        } else {
          turnstileContainer.setAttribute("data-size", "normal");
        }
      }
    };
    adjustTurnstileSize();
    window.addEventListener("resize", adjustTurnstileSize);
    return () => {
      window.removeEventListener("resize", adjustTurnstileSize);
    };

    // ----------------------------------------------------------------
  }

  render() {
    return <></>;
  }
}
