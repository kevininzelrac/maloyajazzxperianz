import { useFetcher } from "@remix-run/react";
import action from "../action";
import { BiLike } from "react-icons/bi";

const Like = ({
  user,
  comment,
}: {
  user: { id: string };
  comment: {
    id: string;
    likes: { author: { id: string } }[];
    _count: { likes: number };
  };
}) => {
  const fetcher = useFetcher<typeof action>();

  return (
    <>
      <button
        onClick={() => {
          fetcher.submit(
            { type: "like", id: user.id, commentId: comment.id },
            {
              method: comment.likes.some(({ author }) => author.id === user.id)
                ? "DELETE"
                : "POST",
            }
          );
        }}
      >
        <BiLike
          color={
            comment.likes.some(({ author }) => author.id === user.id)
              ? "blue"
              : "black"
          }
        />{" "}
        {comment._count.likes}
      </button>
      {fetcher.data?.error && (
        <span data-error>{fetcher.data.error.message}</span>
      )}
    </>
  );
};
export default Like;
