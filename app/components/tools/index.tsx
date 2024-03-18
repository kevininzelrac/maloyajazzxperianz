import Status from "./status";
import Audience from "./audience";
import Edit from "./edit";
import Delete from "./delete";
import usePriviledges from "~/hooks/usePriviledges";
import { Role, User } from "@prisma/client";

export default function Tools({
  user,
  data,
}: {
  user: { id: User["id"]; role: Role };
  data: any;
}) {
  const { isAdmin, isEditor, isAuthor } = usePriviledges(user);

  return (
    <nav className="tools">
      <span>
        {(isAdmin || (isEditor && isAuthor(data?.author.id))) && (
          <Status user={user} id={data?.id} status={data?.status} />
        )}
        {(isAdmin || isEditor) && (
          <Audience user={user} id={data?.id} audience={data?.audience} />
        )}
      </span>
      <span>
        {isAuthor(data?.author.id) && (
          <Edit
            to={`${data?.type.title}/${data?.category.title}/${data?.title}`}
          />
        )}
        {(isAdmin || isAuthor(data?.author.id)) && (
          <Delete id={data?.id} type={data?.type.title} />
        )}
      </span>
    </nav>
  );
}
