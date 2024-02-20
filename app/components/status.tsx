import { Post } from "@prisma/client";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";

export default function Status({ status }: { status: Post["status"] }) {
  const isDraft = status === "DRAFT";
  return (
    <button
      style={{ cursor: "default" }}
      data-tooltip={isDraft ? "draft" : "published"}
    >
      {isDraft ? (
        <MdOutlineUnpublished color="crimson" />
      ) : (
        <MdPublishedWithChanges color="green" />
      )}
    </button>
  );
}
