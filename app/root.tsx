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
import { Franklin } from "./svg";
import backgroundImage from "../public/img/emy05.jpg";
import Header from "./components/header";
import Footer from "./components/footer";

import links from "./styles/index";

import loader from "./loader";
export { loader, links };

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
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

export default function App() {
  const { user, nav } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <IconContext.Provider
        value={{
          className: "react-icons",
        }}
      >
        <Header user={user} data={nav} />
        <Outlet />
        <Footer />
        <img src={backgroundImage} className="background-image" />
        <Franklin className="franklin" />
      </IconContext.Provider>
    </Layout>
  );
}
