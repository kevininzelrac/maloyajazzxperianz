import { useFetcher, useLoaderData, useLocation } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import ReCaptchaEnterprise from "~/components/reCaptchaEntreprise";
import Transition from "~/components/transition";

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => [
  { title: "Contact" },
  { name: "description", content: "Contact" },
];

export default function Contact() {
  const { siteKey } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { key } = useLocation();

  let isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      formRef.current?.reset();
      setShowSuccessMessage(true);

      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fetcher.data, fetcher.state]);

  const handleError = (error: any) => {
    console.error("Error in reCAPTCHA:", error);
  };

  return (
    <Transition key={key}>
      <main>
        <article>
          <fetcher.Form
            method="post"
            ref={formRef}
            aria-disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? ".6" : "1",
            }}
          >
            <input type="email" name="from" placeholder="email" required />
            <textarea name="text" placeholder="message" required></textarea>
            <input type="hidden" name="action" value="LOGIN" />

            <button data-primary disabled={isSubmitting}>
              send
            </button>
            <ReCaptchaEnterprise
              siteKey={siteKey}
              action="LOGIN"
              onTokenChange={() => {}}
              onError={handleError}
            />
            <label>
              {isSubmitting ? fetcher.state : null}
              {showSuccessMessage ? (
                <div>Your message has been sent</div>
              ) : null}
            </label>
          </fetcher.Form>
        </article>
      </main>
    </Transition>
  );
}
