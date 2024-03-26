import { useEffect, useRef, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { BiPlus, BiSave } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import Dialog from "../dialog";

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

export default function Add({
  type,
  category = "",
}: {
  type: string;
  category?: string;
}) {
  const fetcher = useFetcher<fetcherType>();
  const isIdle = fetcher.state === "idle";
  const isLoading = fetcher.state === "loading";
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setDone(false);
    setDisplay(!display);
    setError("");
  };

  useEffect(() => {
    if (isLoading) setDone(true);

    if (fetcher.data?.error) {
      inputRef.current?.focus();
      setError(fetcher.data?.error.message);
      return;
    }
    if (isIdle && done) handleClick();
  }, [fetcher, isLoading]);

  return (
    <>
      <button onClick={handleClick} data-tooltip={"add " + type}>
        <BiPlus />
      </button>
      {display && (
        <Dialog handleClick={handleClick}>
          <h3>
            Create a new {type} {category ? "in " + category : null}
          </h3>

          {error && <span data-error>{error}</span>}
          <fetcher.Form method="post">
            <input type="hidden" name="category" value={category} readOnly />
            <input ref={inputRef} name="title" required autoFocus />
            <button>{isLoading ? <GiSandsOfTime /> : <BiSave />}</button>
          </fetcher.Form>
        </Dialog>
      )}
    </>
  );
}
