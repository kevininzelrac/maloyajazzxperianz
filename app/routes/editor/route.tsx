import { Outlet, useParams } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { NavLink } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import Button from "~/components/button";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
export { loader };

export default function Editor2() {
  const { type, category, post } = useParams();
  return (
    <main>
      {type && !category && (
        <Button to={"/editor"}>
          <MdOutlineKeyboardBackspace />
        </Button>
      )}
      {category && !post && (
        <Button to={"/editor/" + type}>
          <MdOutlineKeyboardBackspace />
        </Button>
      )}
      {post && (
        <Button to={"/editor/" + type + "/" + category}>
          <MdOutlineKeyboardBackspace />
        </Button>
      )}
      <article>
        <nav>
          <NavLink to="/editor" end>
            editor
          </NavLink>
          {type && (
            <NavLink to={type} end>
              {" / " + type}
            </NavLink>
          )}
          {category && (
            <NavLink to={type + "/" + category} end>
              {" / " + category}
            </NavLink>
          )}
          {post && (
            <NavLink to={type + "/" + category + "/" + post} end>
              {" / " + post}
            </NavLink>
          )}
        </nav>

        <Outlet />
      </article>
    </main>
  );
}
