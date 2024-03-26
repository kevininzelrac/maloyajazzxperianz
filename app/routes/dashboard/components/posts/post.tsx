import { SerializeFrom } from "@remix-run/node";
import loader from "../../loader";
import Badge from "~/components/badge";
import { CiCalendar } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import Tools from "~/components/tools";
import { useLoaderData } from "@remix-run/react";

const Post = ({
  post,
}: {
  post: Awaited<SerializeFrom<typeof loader>["posts"]>[0];
}) => {
  const { user } = useLoaderData<typeof loader>();
  const { id, title, type, category, status, audience, author, createdAt } =
    post;
  return (
    <section>
      <div>
        <Badge author={author} />
        {user && <Tools user={user} data={post} />}
      </div>
      <h3>{title}</h3>

      <span>
        {type.title} <MdKeyboardArrowRight /> {category.title}&nbsp;
        <CiCalendar />
        &nbsp;{new Date(createdAt!).toLocaleDateString("fr")}
      </span>
    </section>
  );
};
export default Post;
