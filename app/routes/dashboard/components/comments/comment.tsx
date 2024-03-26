import { SerializeFrom } from "@remix-run/node";
import loader from "../../loader";
import Badge from "~/components/badge";
import { CiCalendar } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useLoaderData } from "@remix-run/react";
import Status from "~/components/tools/status";
import Delete from "~/components/tools/delete";

const Comment = ({
  comment,
}: {
  comment: Awaited<SerializeFrom<typeof loader>["comments"]>[0];
}) => {
  const { user } = useLoaderData<typeof loader>();
  const { id, content, status, createdAt, author, post } = comment;

  return (
    <section>
      <div>
        <Badge author={author} />
        <nav className="tools">
          <span>
            <Status user={user} type="comment" id={id} status={status} />
            <Delete id={id} type="comment" />
          </span>
        </nav>
      </div>

      <span>
        blog <MdKeyboardArrowRight /> {post.category.title}&nbsp;
        <MdKeyboardArrowRight /> {post.title}&nbsp;
        <CiCalendar />
        {new Date(createdAt!).toLocaleDateString("fr")}
      </span>
      <p>{content}</p>
    </section>
  );
};
export default Comment;
