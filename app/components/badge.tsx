//import { type User } from "@prisma/client";

export default function Badge({
  author,
}: {
  author: { avatar: string; firstname: string; lastname: string };
}) {
  return (
    <div className="badge">
      <img src={author?.avatar} width={30} height={30} />
      <span>
        <strong>{author?.firstname}</strong>
        <i>{author?.lastname}</i>
      </span>
    </div>
  );
}
