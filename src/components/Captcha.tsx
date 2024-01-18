import { Component } from "preact";

export default class SubscriptionForm extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
    script.defer = true;
    document.body.appendChild(script);
  }

  render() {
    return <></>;
  }
}
