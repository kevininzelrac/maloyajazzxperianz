import { NavLink, Outlet, useLoaderData, useParams } from "@remix-run/react";

import loader from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

import Delete from "~/components/delete";
import { LinksFunction } from "@remix-run/node";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Blog() {
  const { id: userId, categories } = useLoaderData<typeof loader>();
  const { post } = useParams();

  return (
    <main>
      <Outlet />
      {!post ? (
        <aside>
          <nav className="categories">
            <h4>Categories</h4>
            {categories?.map(({ id, title }) => (
              <div key={title}>
                <NavLink to={title}>{title}</NavLink>
                {userId ? <Delete id={id} type="post" /> : null}
              </div>
            ))}
          </nav>
          <nav>
            <h4>Authors</h4>
            <div>TODO...</div>
          </nav>
        </aside>
      ) : null}
    </main>
  );
}
