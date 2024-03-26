import { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Badge from "~/components/badge";
import Transition from "~/components/transition";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

export default function Settings() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <Transition>
      <main>
        <article>
          <h3>Settings</h3>
          <Badge author={user} />
          <p>{user.role}</p>

          <h3>TODO</h3>
          <p>update avatar</p>
          <p>update password</p>
          <p>delete account</p>
        </article>
      </main>
    </Transition>
  );
}
