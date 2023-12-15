import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { loader } from "./loader";
export { loader };

import ReadOnly from "~/components/slate/readOnly";
import { useState } from "react";
import Dialog from "~/components/dialog";

export const meta: MetaFunction = () => {
  return [{ title: "Home" }, { name: "description", content: "Home" }];
};

import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

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
    <main>
      {display ? (
        <Dialog handleClose={() => setDisplay(false)}>
          <ConfirmDelete />
        </Dialog>
      ) : null}
      <section className="slate">
        <h2>
          {post!.title}{" "}
          {id === post!.authorId ? (
            <>
              <button onClick={() => navigate("Edit")}>
                <BiSolidEditAlt />
              </button>
              <button onClick={() => setDisplay(true)}>
                <MdDeleteForever />
              </button>
            </>
          ) : null}
        </h2>
        <ReadOnly>{post?.content}</ReadOnly>
      </section>
    </main>
  );
}
