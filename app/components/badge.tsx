import { Prisma } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";

export default function Badge({
  author,
}: SerializeFrom<
  Prisma.PostGetPayload<{
    select: {
      author: { select: { firstname: true; lastname: true; avatar: true } };
    };
  }>
>) {
  return (
    <div className="badge">
      <img src={author?.avatar} width={30} height={30} />
      <div>
        <strong>{author?.firstname}</strong>
        <small>{author?.lastname}</small>
      </div>
    </div>
  );
}
