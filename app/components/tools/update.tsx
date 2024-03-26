import { Post, Type } from "@prisma/client";
import { useFetcher, useLocation } from "@remix-run/react";
import { GiSandsOfTime } from "react-icons/gi";
import { IoSaveSharp } from "react-icons/io5";

const Update = ({
  post,
  isDraft,
  setIsDraft,
}: {
  post: {
    id: Post["id"];
    type: { title: Type["title"] };
  };
  isDraft: boolean;
  setIsDraft: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { pathname } = useLocation();
  const fetcher = useFetcher();
  const isLoading = fetcher.state === "loading";

  const handleClick = () => {
    fetcher.submit(
      {
        type: post.type.title,
        id: post.id,
        content: localStorage.getItem("slate" + pathname),
      },
      { method: "PATCH" }
    );
    localStorage.removeItem("slate" + pathname);
    setIsDraft(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isDraft}
      style={{
        cursor: isDraft ? "pointer" : "not-allowed",
        border: isDraft ? "1px solid var(--primary)" : "none",
      }}
    >
      {isLoading ? <GiSandsOfTime /> : <IoSaveSharp />}
    </button>
  );
};
export default Update;
