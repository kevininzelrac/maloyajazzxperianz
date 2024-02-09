import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { Fragment } from "react";

import { loader } from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

import styles from "./styles.css";
import Delete from "~/components/delete";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Blog() {
  const { id: userId, categories } = useLoaderData<typeof loader>();
  return (
    <main>
      <aside>
        <div className="categories">
          {categories?.map(({ id, title }) => (
            <Fragment key={title}>
              <NavLink to={title}>{title}</NavLink>
              {userId ? <Delete id={id} type="post" /> : null}
            </Fragment>
          ))}
        </div>
      </aside>
      <Outlet />
    </main>
  );
}
