import { useFetcher, useLocation } from "@remix-run/react";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { MdDeleteForever } from "react-icons/md";
import Dialog from "./dialog";

export default function Delete({
  id,
  type,
}: Prisma.PostGetPayload<{
  select: { id: true; type: true };
}>) {
  const fetcher = useFetcher();
  const { pathname } = useLocation();
  const [display, setDisplay] = useState(false);

  const ConfirmDelete = () => {
    const handleDelete = () => {
      fetcher.submit(
        { id: id, type: type },
        { method: "post", action: "/api/delete" }
      );
      localStorage.removeItem("slate" + pathname);
    };
    return (
      <>
        CONFIRM DELETE
        <button onClick={handleDelete}>
          <MdDeleteForever />
        </button>
      </>
    );
  };
  return (
    <>
      {display ? (
        <Dialog handleClick={() => setDisplay(false)}>
          <ConfirmDelete />
        </Dialog>
      ) : null}
      <button onClick={() => setDisplay(true)}>
        <MdDeleteForever />
      </button>
    </>
  );
}
