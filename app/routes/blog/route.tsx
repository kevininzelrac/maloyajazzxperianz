import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { loader } from "./loader";
export { loader };

import styles from "./styles.css";
import { LinksFunction } from "@remix-run/node";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Blog() {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <main>
      <aside>
        <div className="categories">
          {categories?.map(({ category }) => (
            <NavLink key={category} to={category}>
              {category}
            </NavLink>
          ))}
        </div>
      </aside>
      <Outlet />
    </main>
  );
}
