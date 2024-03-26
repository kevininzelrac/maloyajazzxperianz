import { useFetcher, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Dialog from "../dialog";
import { GiSandsOfTime } from "react-icons/gi";
type fetcherType =
  | {
      data: unknown;
      error: null;
    }
  | {
      data: null;
      error: {
        message: string;
      };
    }
  | null;

export default function Delete({
  id,
  type,
  redirect = "",
}: {
  id: string;
  type: string;
  redirect?: string;
}) {
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const { pathname } = useLocation();
  const fetcher = useFetcher<fetcherType>();
  const isLoading = fetcher.state === "loading";
  const isIdle = fetcher.state === "idle";

  const handleClick = () => {
    setDone(false);
    setDisplay(!display);
    setError("");
  };

  useEffect(() => {
    if (isLoading) setDone(true);

    if (fetcher.data?.error) {
      setError(fetcher.data?.error.message);
    }
    if (isIdle && done && !error) {
      localStorage.removeItem("slate" + pathname);
      handleClick();
    }
    //if (fetcher.data && !isLoading) {
    //  localStorage.removeItem("slate" + pathname);
    //  fetcher.data && !isLoading && setDisplay(false);
    //}
  }, [fetcher.data, isLoading]);

  return (
    <>
      {display && (
        <Dialog handleClick={handleClick}>
          <h3>are you sure ?</h3>
          {error && <span data-error>{error}</span>}
          <fetcher.Form method="delete">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="redirect" value={redirect} />
            <button type="submit">
              {isLoading ? <GiSandsOfTime /> : <MdDeleteForever />}
            </button>
          </fetcher.Form>
        </Dialog>
      )}
      <button data-tooltip="delete" onClick={handleClick}>
        <MdDeleteForever />
      </button>
    </>
  );
}

// import { useFetcher, useLocation } from "@remix-run/react";
// import { useState } from "react";
// import { MdDeleteForever } from "react-icons/md";
// import Dialog from "../dialog";
// import { GiSandsOfTime } from "react-icons/gi";

// export default function Delete({
//   id,
//   type,
//   redirect = "",
// }: {
//   id: string;
//   type: string;
//   redirect?: string;
// }) {
//   const { pathname } = useLocation();
//   const [display, setDisplay] = useState(false);
//   const fetcher = useFetcher<Record<string, string>>();
//   const isLoading = fetcher.state === "loading";

//   const ConfirmDelete = () => {
//     const handleClick = () => {
//       fetcher.submit({ id, type, redirect }, { method: "delete" });
//       if (fetcher.data?.error) {
//         setDisplay(false);
//         return;
//       }
//       localStorage.removeItem("slate" + pathname);
//     };
//     fetcher.data && !isLoading && setDisplay(false);
//     return (
//       <>
//         CONFIRM DELETE
//         <button onClick={handleClick}>
//           {isLoading ? <GiSandsOfTime /> : <MdDeleteForever />}
//         </button>
//       </>
//     );
//   };
//   return (
//     <>
//       {display && (
//         <Dialog handleClick={() => setDisplay(false)}>
//           <ConfirmDelete />
//         </Dialog>
//       )}
//       <button data-tooltip="delete" onClick={() => setDisplay(true)}>
//         <MdDeleteForever />
//       </button>
//     </>
//   );
// }
