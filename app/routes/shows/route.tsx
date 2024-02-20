import { LinksFunction, MetaFunction } from "@remix-run/node";

import styles from "./styles.css";
import Transition from "~/components/transition";
import loader from "./loader";

export { loader };
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => [
  { title: "Shows" },
  { name: "description", content: "Shows" },
];

export default function Shows() {
  return (
    <Transition>
      <main>
        <article>
          <section>
            <h3>Show</h3>
            <strong>TODO</strong>
          </section>
        </article>
      </main>
    </Transition>
  );
}
