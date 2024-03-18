import { LinksFunction, MetaFunction } from "@remix-run/node";

import Transition from "~/components/transition";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
export { loader };

export const meta: MetaFunction = () => [
  { title: "Shows" },
  { name: "description", content: "Shows" },
];

export default function Shows() {
  return (
    <Transition>
      <main>
        <article>
          <h3>Show</h3>
          <strong>TODO</strong>
        </article>
      </main>
    </Transition>
  );
}
