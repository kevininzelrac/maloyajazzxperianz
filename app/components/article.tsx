import { Link } from "@remix-run/react";
import ReadOnly from "./slate/readOnly";
import image from "../../public/blurryBkgrd.png";
import Badge from "./badge";

export const Article = ({ post, id }: any) => {
  const { createdAt, title, category, content, author } = post;
  return (
    <article key={title}>
      <header
        style={{
          backgroundImage: "url(" + bkgrd(content) + ")",
        }}
      >
        <Link to={"/blog/" + category + "/" + title}>
          <h3>{title}</h3>
        </Link>
        <div>
          <b>{category}</b>{" "}
          <time>écrit le {new Date(createdAt).toLocaleDateString("fr")}</time>
        </div>
        <Badge author={author} />
      </header>
      <ReadOnly>{filterImg(content)}</ReadOnly>
      <br />
    </article>
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
