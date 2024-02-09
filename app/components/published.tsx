import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";

export default function Published({ published }: { published: boolean }) {
  return (
    <>
      {published}
      <button style={{ cursor: "default" }}>
        {published ? (
          <MdPublishedWithChanges color="green" />
        ) : (
          <MdOutlineUnpublished color="crimson" />
        )}
      </button>
    </>
  );
}
