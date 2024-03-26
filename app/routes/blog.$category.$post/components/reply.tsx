import { useFetcher } from "@remix-run/react";
import action from "../action";
import { useEffect, useRef, useState } from "react";
import { BiLoader, BiReply, BiSend } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

const Reply = ({
  user,
  postId,
  parentId,
}: {
  user: { id: string };
  postId: string;
  parentId: string;
}) => {
  const fetcher = useFetcher<typeof action>();
  const [display, setDisplay] = useState(false);
  let ref = useRef<HTMLFormElement>(null);
  let isLoading = fetcher.state === "loading";
  let isError = fetcher.data?.error;

  useEffect(
    function resetFormOnSuccess() {
      if (fetcher.state === "idle" && !fetcher.data?.error) {
        ref.current?.reset();
        setDisplay(false);
      }
    },
    [fetcher.state, fetcher.data]
  );
  if (display)
    return (
      <fetcher.Form ref={ref} method="post">
        <input type="hidden" name="type" value="comment" />
        <input type="hidden" name="id" value={user.id} />
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="parentId" value={parentId} />
        <input
          type="text"
          name="content"
          placeholder="reply"
          required
          autoFocus
        />
        <button>
          {isLoading ? (
            <span>
              <BiLoader />
            </span>
          ) : (
            <BiSend color="#336699" />
          )}
        </button>
        <button onClick={() => setDisplay(false)}>
          <MdCancel />
        </button>
        {isError && <span data-error>{isError.message}</span>}
      </fetcher.Form>
    );
  else
    return (
      <button onClick={() => setDisplay(true)} data-tooltip="Reply">
        <BiReply />
      </button>
    );
};
export default Reply;
