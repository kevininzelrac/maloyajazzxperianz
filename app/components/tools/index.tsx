import {
  User,
  Role,
  Post,
  Type,
  Category,
  Audience as prismaAudience,
  Status as prismaStatus,
} from "@prisma/client";
import Status from "./status";
import Audience from "./audience";
import Edit from "./edit";
import Delete from "./delete";
import usePriviledges from "~/hooks/usePriviledges";

export default function Tools({
  user,
  data,
}: {
  user: { id: User["id"]; role: Role };
  data: {
    id: Post["id"];
    title: Post["title"];
    category: {
      title: Category["title"];
    };
    type: {
      title: Type["title"];
    };

    author: { id: User["id"] };
    status: prismaStatus;
    audience: prismaAudience;
  };
}) {
  const { isAdmin, isEditor, isAuthor } = usePriviledges(user);

  return (
    <nav className="tools">
      <span>
        {(isAdmin || (isEditor && isAuthor(data.author.id))) && (
          <Status
            user={user}
            type={data.type.title}
            id={data.id}
            status={data.status}
          />
        )}
        {(isAdmin || isEditor) && (
          <Audience
            user={user}
            type={data.type.title}
            id={data.id}
            audience={data.audience}
          />
        )}
      </span>
      <span>
        {isAuthor(data.author.id) && (
          <Edit
            to={`${data.type.title}/${data.category.title}/${data.title}`}
          />
        )}
        {(isAdmin || isAuthor(data.author.id)) && (
          <Delete id={data.id} type={data.type.title} />
        )}
      </span>
    </nav>
  );
}
