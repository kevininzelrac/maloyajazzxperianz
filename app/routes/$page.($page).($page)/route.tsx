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

export const meta: MetaFunction = () => [
  { title: "Home" },
  { name: "description", content: "Home" },
];

import { BiSolidEditAlt } from "react-icons/bi";

export default function Index() {
  const { id, page } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.replace("/Edit", "");
  const [display, setDisplay] = useState(false);

  const ConfirmDelete = () => {
    const handleDelete = () => {
      fetcher.submit(
        { id: page!.id, type: page!.type },
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
        {id === page!.authorId ? (
          <>
            <button onClick={() => navigate("Edit")}>
              <BiSolidEditAlt />
            </button>
            <button onClick={() => setDisplay(true)}>Delete</button>
          </>
        ) : null}
        <ReadOnly>{page!.content}</ReadOnly>
      </section>
    </main>
  );
}
