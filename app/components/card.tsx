import { Link } from "@remix-run/react";
import { Prisma, Role, User } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import image from "public/blurryBkgrd.png";
import Header from "./header";
import Badge from "./badge";
import Status from "./status";
import Edit from "./edit";
import Delete from "./delete";
import spotifyIcon from "public/img/spotifyIcon.png";
import Audience from "./audience";

type Props = {
  user: { id?: User["id"]; role?: Role };
  post: SerializeFrom<
    Prisma.PostGetPayload<{
      select: {
        id: true;
        title: true;
        type: true;
        category: true;
        createdAt: true;
        status: true;
        audience: true;
        content: true;
        authorId: true;
        author: { select: { firstname: true; avatar: true } };
      };
    }>
  >;
};

export default function Card({ user, post }: Props) {
  const { id, title, type, category, status, audience, authorId } = post;
  let isAuthor = user?.id === authorId;
  let isAdmin = user?.role === "ADMIN";
  return (
    <article>
      <div className="tools">
        {user?.id && <Status status={status!} />}
        {user?.id && <Audience audience={audience} />}
        {isAuthor! && <Edit to={"/blog/" + category + "/" + title} />}
        {(isAdmin! || isAuthor!) && <Delete id={id} type={type} />}
      </div>
      <Badge {...post} />
      <Cover {...post} />
      <section>
        <Header {...post} />
        <Excerpt {...post} />
        <Link className="primary" to={"/blog/" + category + "/" + title}>
          Lire
        </Link>
      </section>
    </article>
  );
}

const Excerpt = ({
  content,
}: Prisma.PostGetPayload<{
  select: {
    content: true;
  };
}>) => {
  const excerpt = content.includes("children")
    ? JSON.parse(content)
        .filter(({ children }: any) => children[0].text !== "")
        .map(({ children }: any) => children[0].text)
        .toString()
    : content;
  return (
    <p className="excerpt">
      {excerpt.substring(0, 200)}
      ...
    </p>
  );
};

const Cover = ({
  content,
}: Prisma.PostGetPayload<{
  select: {
    content: true;
  };
}>) => {
  const youtube = content.includes("youtube")
    ? "https://img.youtube.com/vi/" +
      new URL(
        JSON.parse(content).find(({ type }: any) => type === "youtube").src
      ).pathname
        .split("/")
        .pop() +
      "/maxresdefault.jpg"
    : null;

  const img = content.includes("image")
    ? JSON.parse(content).find(({ type }: any) => type === "image").src
    : null;

  const spotify = content.includes("spotify") ? spotifyIcon : null;

  return <img className="cover" src={youtube || img || spotify || image} />;
};
