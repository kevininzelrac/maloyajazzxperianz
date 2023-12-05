import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import root from "./styles/root.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [{ rel: "stylesheet", href: root }]),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Maloya Jazz Xperianz</h1>
        <nav>
          <NavLink to="" prefetch="intent">
            Home
          </NavLink>
          <NavLink to="blog" prefetch="intent">
            Blog
          </NavLink>
          <NavLink to="profil" prefetch="intent">
            Profil
          </NavLink>
          <NavLink to="upload" prefetch="intent">
            Upload
          </NavLink>
          <NavLink to="contact" prefetch="intent">
            Contact
          </NavLink>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
