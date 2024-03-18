import { useFetcher } from "@remix-run/react";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";
import { Status as PostStatus, Role, User } from "@prisma/client";
import { GiSandsOfTime } from "react-icons/gi";
import usePriviledges from "~/hooks/usePriviledges";

const Status2 = ({
  user,
  id,
  status,
}: {
  user: { id: User["id"]; role: Role };
  id: string;
  status: PostStatus;
}) => {
  const { isAdmin } = usePriviledges(user);
  const fetcher = useFetcher();
  const isLoading = fetcher.state === "loading";
  const isDraft = status === "DRAFT";

  const handleClick = () => {
    fetcher.submit(
      {
        id,
        status: isDraft ? "PUBLISHED" : "DRAFT",
      },
      { method: "POST" }
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
export default Status2;
