import { LinksFunction } from "@remix-run/node";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Dashboard() {
  return (
    <main>
      <article>
        <h3>TODO : Dashboard</h3>
        <p>Last Subscribers</p>
        <p>Last Posts</p>
        <p>Last Comments</p>
        <p>Last Messages</p>
        <p>Last Sales</p>
      </article>
    </main>
  );
}
