import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { loader } from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

import ReadOnly from "~/components/slate/readOnly";
import { useState } from "react";
import Dialog from "~/components/dialog";

import styles from "./styles.css";
import { LinksFunction } from "@remix-run/node";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [{ title: "Home" }, { name: "description", content: "Home" }];
};

import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Badge from "~/components/badge";

export default function Index() {
  const { id, post } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = pathname.replace("/Edit", "");
  const [display, setDisplay] = useState(false);

  const ConfirmDelete = () => {
    const handleDelete = () => {
      fetcher.submit(
        { id: post!.id, type: post!.type },
        { method: "POST", action: "/api/delete" }
      );
      localStorage.removeItem("slate" + path);
    };
    return <button onClick={handleDelete}>confirm Delete</button>;
  };
  return (
    <section className="slate">
      {display ? (
        <Dialog handleClose={() => setDisplay(false)}>
          <ConfirmDelete />
        </Dialog>
      ) : null}
      <article>
        <header>
          <div className="title">
            <h3>{post!.title}</h3>
            {id === post!.authorId ? (
              <span>
                <button onClick={() => navigate("Edit")}>
                  <BiSolidEditAlt />
                </button>
                <button onClick={() => setDisplay(true)}>
                  <MdDeleteForever />
                </button>
              </span>
            ) : null}
          </div>
          <div className="metadata">
            <b>{post!.category}</b>
            {"  "}
            <time>
              <i>
                écrit le {new Date(post!.createdAt).toLocaleDateString("fr")}
              </i>
            </time>
          </div>
          <Badge author={post!.author} />
        </header>
        <ReadOnly>{post?.content}</ReadOnly>
      </article>
    </section>
  );
}
