import { useFetcher, useLocation } from "@remix-run/react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Dialog from "../dialog";
import { GiSandsOfTime } from "react-icons/gi";

export default function Delete({
  id,
  type,
  redirect = "",
}: {
  id: string;
  type: string;
  redirect?: string;
}) {
  const { pathname } = useLocation();
  const [display, setDisplay] = useState(false);
  const fetcher = useFetcher<Record<string, string>>();
  const isLoading = fetcher.state === "loading";

  const ConfirmDelete = () => {
    const handleClick = () => {
      fetcher.submit({ id, type, redirect }, { method: "delete" });
      if (fetcher.data?.error) {
        setDisplay(false);
        return;
      }
      localStorage.removeItem("slate" + pathname);
    };
    fetcher.data && !isLoading && setDisplay(false);
    return (
      <>
        CONFIRM DELETE
        <button onClick={handleClick}>
          {isLoading ? <GiSandsOfTime /> : <MdDeleteForever />}
        </button>
      </>
    );
  };
  return (
    <>
      {display && (
        <Dialog handleClick={() => setDisplay(false)}>
          <ConfirmDelete />
        </Dialog>
      )}
      <button data-tooltip="delete" onClick={() => setDisplay(true)}>
        <MdDeleteForever />
      </button>
    </>
  );
}
