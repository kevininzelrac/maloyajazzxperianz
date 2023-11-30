import { NavLink, Outlet } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import { loader } from "./loader";
export { loader };

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Auth() {
  return (
    <main>
      <h2>Auth</h2>
      <nav>
        <NavLink to="signin">Sign In</NavLink>
        <NavLink to="signup">Sign Up</NavLink>
      </nav>
      <Outlet />
    </main>
  );
}
