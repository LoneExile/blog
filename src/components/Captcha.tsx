import { Component } from "preact";

export default class SubscriptionForm extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
    script.defer = true;
    document.body.appendChild(script);
    // ----------------------------------------------------------------
    // Event listener when turnstile is loaded
    const subscribeButton = document.getElementById("subscribe") as HTMLElement;
    const subscribeDisabledButton = document.getElementById(
      "subscribe-disabled",
    ) as HTMLElement;
    const subscribeWaitButton = document.getElementById(
      "subscribe-wait",
    ) as HTMLElement;

    subscribeButton.classList.add("hidden");
    subscribeDisabledButton.classList.add("hidden");
    subscribeWaitButton.classList.remove("hidden");

    function toggleSubscribeButton() {
      const selectTurnstileToken = document.querySelector(
        'input[name="cf-turnstile-response"]',
      );
      const turnstileToken = (selectTurnstileToken as HTMLInputElement).value;
      if (turnstileToken && turnstileToken.trim() !== "") {
        subscribeButton.classList.remove("hidden");
        subscribeDisabledButton.classList.add("hidden");
        subscribeWaitButton.classList.add("hidden");
      } else {
        subscribeButton.classList.add("hidden");
        subscribeDisabledButton.classList.remove("hidden");
        subscribeWaitButton.classList.add("hidden");
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
    // Event listener when form is submitted
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
            const selectEmail = document.querySelector(
              'input[name="email"]',
            ) as HTMLInputElement;
            (selectEmail as HTMLInputElement).value = "";
            const selectTurnstileToken = document.querySelector(
              "#cf-turnstile-ele",
            ) as HTMLInputElement;
            selectTurnstileToken.classList.add("hidden");
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      });
    // ----------------------------------------------------------------
    // Adjust turnstile size on window resize
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
