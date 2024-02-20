import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

declare global {
  interface Window {
    handleCreds: (response: any) => void;
  }
}

export default function GoogleSign({ client_id }: { client_id: string }) {
  const fetcher = useFetcher();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.handleCreds = ({ credential }: any) => {
      fetcher.submit(
        {
          type: "google",
          accessToken: credential,
          offset: new Date().getTimezoneOffset(),
        },
        { method: "post", action: "/api/google" }
      );
    };
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={client_id}
        data-callback="handleCreds"
        data-auto_prompt="false"
      ></div>
      {fetcher.state === "idle" ? (
        <div
          className="g_id_signin"
          data-height="auto"
          data-type="standard"
          data-size="large"
          data-width="300"
          data-theme="outline"
          data-text="sign_in_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        ></div>
      ) : (
        <i>{fetcher.state}</i>
      )}
    </>
  );
}
