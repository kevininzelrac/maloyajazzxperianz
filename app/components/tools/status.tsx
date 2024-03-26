import { useFetcher } from "@remix-run/react";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";
import { User, Role, Status as prismaStatus } from "@prisma/client";
import { GiSandsOfTime } from "react-icons/gi";
import usePriviledges from "~/hooks/usePriviledges";

const Status = ({
  user,
  type,
  id,
  status,
}: {
  user: { id: User["id"]; role: Role };
  type: string;
  id: string;
  status: prismaStatus;
}) => {
  const { isAdmin } = usePriviledges(user);
  const fetcher = useFetcher();
  const isLoading = fetcher.state === "loading";
  const isDraft = status === "DRAFT";

  const handleClick = () => {
    fetcher.submit(
      {
        type,
        id: id,
        status: isDraft ? "PUBLISHED" : "DRAFT",
      },
      { method: "PATCH" }
    );
  };
  return (
    <button
      onClick={handleClick}
      data-tooltip={isDraft ? "draft" : "published"}
      disabled={!isAdmin}
      style={{
        cursor: isAdmin ? "pointer" : "not-allowed",
      }}
    >
      {isLoading ? (
        <GiSandsOfTime />
      ) : isDraft ? (
        <MdOutlineUnpublished color="crimson" />
      ) : (
        <MdPublishedWithChanges color="green" />
      )}
    </button>
  );
};
export default Status;
