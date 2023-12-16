import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { IconContext } from "react-icons";
import root from "./styles/root.css";
import slate from "./styles/slate.css";
import dialog from "./styles/dialog.css";
import badge from "./styles/badge.css";
import { auth } from "./services/auth/index.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [
        { rel: "stylesheet", href: root },
        { rel: "stylesheet", href: slate },
        { rel: "stylesheet", href: dialog },
        { rel: "stylesheet", href: badge },
      ]),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  return json({ id }, { headers });
};

export default function App() {
  const { id } = useLoaderData<typeof loader>();

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
        <nav className="navbar">
          <NavLink to="/" prefetch="intent">
            HOME
          </NavLink>
          <NavLink to="blog" prefetch="intent">
            BLOG
          </NavLink>
          <NavLink to="contact" prefetch="intent">
            CONTACT
          </NavLink>
          {id ? (
            <>
              <NavLink to="upload" prefetch="intent">
                UPLOAD
              </NavLink>
              <NavLink to="profil" prefetch="intent">
                PROFIL
              </NavLink>
              <NavLink to="add" prefetch="intent">
                +
              </NavLink>
            </>
          ) : (
            <NavLink to="signin" prefetch="intent">
              SIGN IN
            </NavLink>
          )}
        </nav>
        <IconContext.Provider
          value={{
            className: "react-icons",
          }}
        >
          <Outlet />
        </IconContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
