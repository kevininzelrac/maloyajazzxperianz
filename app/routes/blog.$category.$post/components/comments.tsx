import { SerializeFrom } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Reply from "./reply";
import Like from "./like";
import loader from "../loader";
import Badge from "~/components/badge";
import usePriviledges from "~/hooks/usePriviledges";
import { Role } from "@prisma/client";
import Status from "~/components/tools/status";
import Delete from "~/components/tools/delete";

const Comments = ({
  user,
  comments,
}: {
  user: { id: string; role: Role };
  comments: SerializeFrom<typeof loader>["comments"];
}) => {
  const { post } = useLoaderData<typeof loader>();
  let isRoot = post.id === comments[0]?.parentId;
  const { isAdmin, isAuthor } = usePriviledges(user);

  return (
    <>
      {comments?.map((comment) => (
        <div
          key={comment.id}
          className="comment"
          style={{ marginLeft: isRoot ? 0 : "1rem" }}
        >
          <header>
            <Badge author={comment.author} />
            {(isAdmin || isAuthor(comment.author.id)) && (
              <span className="tools">
                <Status
                  user={user}
                  type="comment"
                  id={comment.id}
                  status={comment.status}
                />
                <Delete id={comment.id} type="comment" />
              </span>
            )}
          </header>
          <p>{comment.content}</p>
          <footer>
            <Reply user={user} postId={post.id} parentId={comment.id} />
            <Like user={user} comment={comment} />
          </footer>
          <Comments user={user} comments={comment.children} />
        </div>
      ))}
    </>
  );
};

export default Comments;
