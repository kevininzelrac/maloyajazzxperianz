import { useFetcher } from "@remix-run/react";
import { MdGroups, MdPublic } from "react-icons/md";
import { User, Role, Audience as prismaAudience } from "@prisma/client";
import { GiSandsOfTime } from "react-icons/gi";
import usePriviledges from "~/hooks/usePriviledges";

const Audience = ({
  user,
  type,
  id,
  audience,
}: {
  user: { id: User["id"]; role: Role };
  type: string;
  id: string;
  audience: prismaAudience;
}) => {
  const { isAdmin } = usePriviledges(user);
  const fetcher = useFetcher();
  let isLoading = fetcher.state === "loading";
  let isPublic = audience === "PUBLIC";

  const handleClick = () => {
    fetcher.submit(
      {
        type,
        id: id,
        audience: isPublic ? "PRIVATE" : "PUBLIC",
      },
      { method: "PATCH" }
    );
  };

  return (
    <button
      onClick={handleClick}
      data-tooltip={isPublic ? "public" : "private"}
      disabled={!isAdmin}
      style={{
        cursor: isAdmin ? "pointer" : "not-allowed",
      }}
    >
      {isLoading ? (
        <GiSandsOfTime />
      ) : isPublic ? (
        <MdPublic color="#336699" />
      ) : (
        <MdGroups color="orange" />
      )}
    </button>
  );
};
export default Audience;
