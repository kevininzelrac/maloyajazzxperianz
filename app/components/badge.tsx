import { Prisma } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { CiCalendar } from "react-icons/ci";

export default function Badge({
  createdAt,
  author,
}: SerializeFrom<
  Prisma.PostGetPayload<{
    select: {
      createdAt: true;
      author: { select: { firstname: true; avatar: true } };
    };
  }>
>) {
  return (
    <div className="badge">
      <img src={author?.avatar} width={30} height={30} />
      <span>
        <span>
          <strong>{author?.firstname}</strong>
          <small>
            <i> • job todo...</i>
          </small>
        </span>
        {createdAt ? (
          <time>
            <CiCalendar />
            {new Date(createdAt!).toLocaleDateString("fr")}
          </time>
        ) : null}
      </span>
    </div>
  );
}
