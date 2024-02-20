import { useFetcher, useLoaderData } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import ReCaptchaEnterprise from "~/components/reCaptchaEntreprise";
import ErrorBoundary from "~/components/errorBoundary";
import loader from "./loader";
import action from "./action";
import styles from "./styles.css";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Transition from "~/components/transition";

export { loader, action, ErrorBoundary };

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
    <Transition>
      <main>
        <section>
          <div>
            youtube <FaYoutube color="#FF0000" />
          </div>
          <div>
            instagram <FaInstagram color="#E1306C" />
          </div>
          <div>
            facebook <FaFacebook color="#4267B2" />
          </div>
        </section>
        <fetcher.Form
          method="post"
          ref={formRef}
          aria-disabled={isSubmitting}
          style={{ opacity: isSubmitting ? ".6" : "1" }}
        >
          <legend>Your Email</legend>
          <input type="email" name="from" required autoFocus />
          <legend>Message</legend>
          <textarea name="text" required></textarea>
          <input type="hidden" name="action" value="LOGIN" />

          <button className="primary" type="submit" disabled={isSubmitting}>
            envoyer
          </button>
          <ReCaptchaEnterprise
            siteKey={siteKey}
            action="LOGIN"
            onTokenChange={() => {}}
            onError={handleError}
          />
          <label>
            {isSubmitting ? fetcher.state : null}
            {showSuccessMessage ? <div>Your message has been sent</div> : null}
          </label>
        </fetcher.Form>
        {/* {fetcher.data ? <pre>{JSON.stringify(fetcher.data, null, 3)}</pre> : null} */}
      </main>
    </Transition>
  );
}
