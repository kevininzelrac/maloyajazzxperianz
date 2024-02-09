import { useNavigate } from "@remix-run/react";
import ReadOnly from "./slate/readOnly";
import image from "../../public/blurryBkgrd.png";
import Badge from "./badge";
import Edit from "./edit";
import Delete from "./delete";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Published from "./published";

type Props = {
  userId: string;
  post: {
    id: string;
    type: string;
    category: string;
    title: string;
    content: string;
    createdAt: Date | string;
    published: boolean;
    authorId: string;
    author: {
      firstname: string;
      lastname: string;
      avatar: string;
    };
  };
};
export const Article = ({ post, userId }: Props) => {
  const {
    id,
    type,
    category,
    title,
    content,
    createdAt,
    published,
    authorId,
    author,
  } = post;
  const navigate = useNavigate();

  return (
    <section>
      <header
        style={{
          backgroundImage: "url(" + bkgrd(content) + ")",
        }}
      >
        <div className="title">
          <h3>{title}</h3>
          <span>
            {userId ? <Published published={published} /> : null}
            {userId === authorId ? (
              <>
                <Edit to={"/blog/" + category + "/" + title} />
                <Delete id={id} type={type} />
              </>
            ) : null}
          </span>
        </div>
        <div className="metadata">
          category <b>{category}</b>{" "}
          <time>écrit le {new Date(createdAt!).toLocaleDateString("fr")}</time>
        </div>
        <Badge author={author} />
      </header>
      <article key={title}>
        <ReadOnly>{filterImg(content)}</ReadOnly>
      </article>
      <footer>
        <button onClick={() => navigate("/blog/" + category + "/" + title)}>
          <MdOutlineArrowRightAlt />
        </button>
      </footer>
    </section>
  );
};

const bkgrd = (data: string) => {
  if (!data.includes("image")) return image;
  const { src } = JSON.parse(data).find(({ type }: any) => type === "image");

  return src ? src : image;
};

const filterImg = (data: any) => {
  if (!data.includes("image")) return data;
  const response = JSON.parse(data).filter(({ type }: any) => type !== "image");
  return JSON.stringify(response);
};
