import { useFetcher } from "@remix-run/react";
import action from "../action";
import { BiLoader, BiTrash } from "react-icons/bi";

const Delete = ({ id }: { id: string }) => {
  const fetcher = useFetcher<typeof action>();
  const isLoading = fetcher.state === "loading";
  const isError = fetcher.data?.error;
  return (
    <>
      <button
        onClick={() => {
          fetcher.submit({ type: "comment", id }, { method: "delete" });
        }}
      >
        <BiTrash />
      </button>
      {isLoading && (
        <span data-loader>
          <BiLoader />
        </span>
      )}
      {isError && <span data-error>{isError.message}</span>}
    </>
  );
};

export default Delete;
