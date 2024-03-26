import { User } from "@prisma/client";

export default function Badge({
  author,
}: {
  author: {
    firstname: User["firstname"];
    lastname?: User["lastname"];
    avatar?: User["avatar"];
  };
}) {
  return (
    <div className="badge">
      <img src={author.avatar} width={30} height={30} />
      <div>
        <strong>{author.firstname}</strong>
        {author.lastname && <small>{author.lastname}</small>}
      </div>
    </div>
  );
}
