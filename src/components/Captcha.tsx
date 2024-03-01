import { Component } from "preact";

export default class SubscriptionForm extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
    script.defer = true;
    document.body.appendChild(script);
    // ----------------------------------------------------------------
    //
    const turnstileContainer = document.querySelector(
      ".cf-turnstile",
    ) as HTMLElement;
    const selectTurnstileToken = () => {
      return document.querySelector(
        'input[name="cf-turnstile-response"]',
      ) as HTMLInputElement;
    }
    const selectTurnstileTokenEle = document.querySelector(
      "#cf-turnstile-ele",
    ) as HTMLInputElement;
    const subscribeButton = document.getElementById("subscribe") as HTMLElement;
    const subscribeDisabledButton = document.getElementById(
      "subscribe-disabled",
    ) as HTMLElement;
    const subscribeWaitButton = document.getElementById(
      "subscribe-wait",
    ) as HTMLElement;
    const selectEmail = document.querySelector(
      'input[name="email"]',
    ) as HTMLInputElement;
    const badgeSuccess = document.getElementById(
      "subscribe-success",
    ) as HTMLElement;
    const badgeError = document.getElementById(
      "subscribe-error",
    ) as HTMLElement;

    // ----------------------------------------------------------------
    // Event listener when turnstile is loaded

    subscribeButton.classList.add("hidden");
    subscribeDisabledButton.classList.add("hidden");
    subscribeWaitButton.classList.remove("hidden");

    function toggleSubscribeButton() {
      const turnstileToken = selectTurnstileToken().value;
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
      ?.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = (selectEmail as HTMLInputElement).value;
        const turnstileToken = selectTurnstileToken().value;

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
            selectEmail.value = "";
            badgeSuccess.classList.remove("hidden");
            selectTurnstileTokenEle.classList.add("hidden");
            return response.json();
          })
          .catch((error) => {
            badgeError.classList.remove("hidden");
            selectTurnstileTokenEle.classList.add("hidden");
            console.error("Error:", error);
          });
      });
    // ----------------------------------------------------------------
    // Adjust turnstile size on window resize
    const adjustTurnstileSize = () => {
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
