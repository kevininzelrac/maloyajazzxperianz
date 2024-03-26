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

import { MdAccountCircle } from "react-icons/md";
import { Franklin } from "./svg";
import backgroundImage from "../public/img/emy05.jpg";

import Header from "./components/header";
import Nav from "./components/nav";
import Account from "./components/account";
import Responsive from "./components/nav/responsive";
import Footer from "./components/footer";

import loader from "./loader";
import action from "./action";
import links from "./styles/index";
export { loader, action, links };

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
  const { user, pages } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Header>
        <Nav pages={pages.data} />
        <Responsive user={user} data={pages.data} />
        {user?.id ? (
          <Account user={user} />
        ) : (
          <NavLink to="signin" prefetch="intent" className="signin">
            <MdAccountCircle />
          </NavLink>
        )}
      </Header>
      <Outlet />
      <Footer />
      <img src={backgroundImage} className="background-image" />
      <Franklin className="franklin" />
    </Layout>
  );
}
