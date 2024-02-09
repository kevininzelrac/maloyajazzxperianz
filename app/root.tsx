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
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { IconContext } from "react-icons";
import { auth } from "./services/auth/index.server";
import { Post } from "@prisma/client";
import { prisma } from "./services/prisma.server";
import Nav from "./components/nav";

import root from "./styles/root.css";
import slate from "./styles/slate.css";
import dialog from "./styles/dialog.css";
import badge from "./styles/badge.css";
import nav from "./styles/nav.css";
import article from "./styles/article.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [
        { rel: "stylesheet", href: root },
        { rel: "stylesheet", href: slate },
        { rel: "stylesheet", href: dialog },
        { rel: "stylesheet", href: badge },
        { rel: "stylesheet", href: nav },
        { rel: "stylesheet", href: article },
      ]),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const nav = await prisma.post.findMany({
    where: {
      NOT: { OR: [{ type: "post" }, { category: "post" }] },
      published: id ? {} : true,
    },
    select: {
      title: true,
      type: true,
      category: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const recursive = (data: any, parent: string) =>
    data
      .filter(({ category }: any) => category === parent)
      .map(({ title, type, category }: Post) => ({
        title,
        type,
        category,
        children: recursive(data, title),
      }));

  return json({ id, nav: recursive(nav, "page") }, { headers });
};

export default function App() {
  const { id, nav } = useLoaderData<typeof loader>();

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

        <Nav data={nav} id={id} />

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
