import { Post } from "@prisma/client";
import { MdPublic } from "react-icons/md";
import { MdGroups } from "react-icons/md";

export default function Audience({ audience }: { audience: Post["audience"] }) {
  const isPublic = audience === "PUBLIC";
  return (
    <button
      style={{ cursor: "default" }}
      data-tooltip={isPublic ? "public" : "private"}
    >
      {isPublic ? (
        <MdPublic color="#336699" />
      ) : (
        <MdGroups color="var(--dark)" />
      )}
    </button>
  );
}
