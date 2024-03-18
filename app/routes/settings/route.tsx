import { LinksFunction } from "@remix-run/node";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
import { useLoaderData } from "@remix-run/react";
import Badge from "~/components/badge";
import Error from "~/components/error";
export { loader };

export default function Settings() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <main>
      <article>
        <h3>Settings</h3>
        <Error data={user}>
          {(data) => (
            <>
              <Badge author={data!} />
              <p>{user.data?.role}</p>
            </>
          )}
        </Error>
        <h3>TODO</h3>
        <p>update avatar</p>
        <p>update password</p>
        <p>delete account</p>
      </article>
    </main>
  );
}
