import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

type ReCaptchaProps = {
  siteKey: string;
  action: string;
  onTokenChange: (token: string) => void;
  onError: (error: any) => void;
};

export default function ReCaptchaEnterprise({
  siteKey,
  action,
  onTokenChange,
  onError,
}: ReCaptchaProps) {
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.id = "recaptcha";
    document.head.appendChild(script);

    script.onload = () => {
      window.grecaptcha.enterprise.ready(() => {
        window.grecaptcha.enterprise
          .execute(siteKey, {
            action: action || "DEFAULT_ACTION",
          })
          .then((token: string) => {
            setRecaptchaToken(token);
            onTokenChange && onTokenChange(token);
          })
          .catch((error: any) => {
            console.error("reCAPTCHA execution error:", error);
            onError && onError(error);
          });
      });
    };

    script.onerror = (event: Event | string) => {
      console.error("Error loading reCAPTCHA script:", event);
      onError && onError(event);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [siteKey, action, onTokenChange, onError]);

  return (
    <div>
      <input type="hidden" name="token" value={recaptchaToken} />
      <small>
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy">Privacy Policy </a> and{" "}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </small>
    </div>
  );
}

//const styles: { div: React.CSSProperties; a: React.CSSProperties } = {
// //const styles: { [key: string]: React.CSSProperties } = {
// const styles: Record<string, React.CSSProperties> = {
//   div: {
//     color: "#323232",
//     fontSize: ".5rem",
//     margin: "4px",
//   },
//   a: {
//     color: "#323232",
//     fontSize: ".5rem",
//     textTransform: "lowercase",
//   },
// };

// const styles = {
//   div: {
//     color: "#323232",
//     fontSize: ".5rem",
//     margin: "4px",
//   },
//   a: {
//     color: "#323232",
//     fontSize: ".5rem",
//     textTransform: "lowercase",
//   },
// };

// type Styles = typeof styles;
