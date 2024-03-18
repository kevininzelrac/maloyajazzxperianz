import { NavLink, Outlet, useLocation } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import loader from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

import styles from "./styles.css";
import Transition from "~/components/transition";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Auth() {
  const { key } = useLocation();
  return (
    <Transition key={key}>
      <main>
        <article>
          <nav>
            <NavLink to="signin">Sign In</NavLink>•
            <NavLink to="signup">Sign Up</NavLink>
          </nav>
          <Outlet />
        </article>
      </main>
    </Transition>
  );
}
