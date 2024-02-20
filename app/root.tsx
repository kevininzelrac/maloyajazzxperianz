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
import auth from "./services/auth.server";
import prisma from "./services/prisma.server";

import Nav from "./components/nav";
import Footer from "./components/footer";
import backgroundImage from "../public/img/emy05.jpg";

import a from "./styles/a.css";
import animations from "./styles/animations.css";
import badge from "./styles/badge.css";
import borders from "./styles/borders.css";
import dialog from "./styles/dialog.css";
import fonts from "./styles/fonts.css";
import footer from "./styles/footer.css";
import nav from "./styles/nav.css";
import root from "./styles/root.css";
import variables from "./styles/variables.css";
import loading from "./styles/loading.css";
import withPriviledges from "./middlewares/withPriviledge";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [
        { rel: "stylesheet", href: a },
        { rel: "stylesheet", href: animations },
        { rel: "stylesheet", href: badge },
        { rel: "stylesheet", href: borders },
        { rel: "stylesheet", href: dialog },
        { rel: "stylesheet", href: fonts },
        { rel: "stylesheet", href: footer },
        { rel: "stylesheet", href: nav },
        { rel: "stylesheet", href: root },
        { rel: "stylesheet", href: loading },
        { rel: "stylesheet", href: variables },
      ]),
];

import loader from "./loader";
export { loader };
// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const { id, headers } = await auth(request);

//   const user = id
//     ? await prisma.user.findUnique({
//         where: {
//           id,
//         },
//         select: {
//           id: true,
//           firstname: true,
//           lastname: true,
//           avatar: true,
//           role: true,
//         },
//       })
//     : null;

//   const nav = await prisma.post.findMany({
//     where: withPriviledges(user, {
//       NOT: { OR: [{ type: "post" }, { category: "post" }] },
//     }),
//     select: {
//       title: true,
//       type: true,
//       category: true,
//     },
//     orderBy: { createdAt: "asc" },
//   });

//   const recursive = (data: any, parent: string) =>
//     data
//       .filter(({ category }: any) => category === parent)
//       .map(({ title, type, category }: any) => ({
//         title,
//         type,
//         category,
//         children: recursive(data, title),
//       }));

//   return json({ id, user, nav: recursive(nav, "page") }, { headers });
// };

export default function App() {
  const { user, nav } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <img src={backgroundImage} className="background-image" />
        <h1>
          Maloya <br />
          ---Jazz <br />
          Xperianz
        </h1>
        <Nav user={user} data={nav} />

        <IconContext.Provider
          value={{
            className: "react-icons",
          }}
        >
          <Outlet />
          <Footer />
        </IconContext.Provider>
        <ScrollRestoration
          getKey={(location, matches) => {
            return ["blog"].includes(location.pathname)
              ? location.pathname
              : location.key;
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
