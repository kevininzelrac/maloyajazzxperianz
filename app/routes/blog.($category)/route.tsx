import { useLocation } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useState } from "react";

import { CgClose } from "react-icons/cg";
import { MdMenu } from "react-icons/md";

import Categories from "./components/categories";
import Authors from "./components/authors";
import Posts from "./components/posts";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

export default function Blog() {
  const { key } = useLocation();
  const [display, setDisplay] = useState(true);

  const handleClick = () => setDisplay(!display);

  return (
    <main key={key}>
      <Posts />
      <aside
        style={{
          transition: "all 0.4s ease-in-out",
          marginRight: display ? "0%" : "-50%",
        }}
      >
        <Categories />
        <Authors />
      </aside>
      <button className="aside" onClick={handleClick}>
        {display ? <CgClose /> : <MdMenu />}
      </button>
    </main>
  );
}
