import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { useState } from "react";

import Editor from "~/components/slate/editor";
import ClientOnly from "~/utils/clientOnly";
import ReadOnly from "~/components/slate/readOnly";

import { loader } from "./loader";
import { action } from "./action";
export { loader, action };

import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [{ title: "Home" }, { name: "description", content: "Home" }];
};

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoSaveSharp } from "react-icons/io5";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdOutlineUnpublished } from "react-icons/md";

export default function Index() {
  const { id, page, categories } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.replace("/Edit", "");
  const [type, setType] = useState(page!.type);
  const [category, setCategory] = useState(page!.category);
  const [published, setPublished] = useState(page!.published);
  const [isDraft, setIsDraft] = useState(false);

  const initialState = JSON.stringify([
    page!.type,
    page!.category,
    page!.published,
    false,
  ]);
  const updatedState = JSON.stringify([type, category, published, isDraft]);

  const handleSave = async () => {
    const data: {
      id: string;
      type: string;
      category?: string;
      published: boolean;
      title: string;
      content: string;
    } = {
      id: page!.id,
      type: type,
      published: published,
      title: page!.title,
      content: localStorage.getItem("slate" + path) || page!.content,
    };

    if (category !== page!.category) data.category = category;

    fetcher.submit(data, { method: "post" });
    localStorage.removeItem("slate" + path);
    setIsDraft(false);
  };

  return (
    <main>
      <section className="slate">
        {id === page!.authorId ? (
          <>
            {/* Exit Button */}
            <button
              //onClick={() => navigate(path.replace(page!.category, category))}
              onClick={() => navigate(path)}
              style={{ color: "#336699" }}
            >
              <MdOutlineKeyboardBackspace />
            </button>
            {/* Page Title */}
            <strong>{page?.title}</strong>
            {/* Select Type */}
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="page">page</option>
              <option value="post">post</option>
              <option value="category">category</option>
            </select>
            {/* Select Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories
                .filter((item: any) => item.type === type)
                .map(({ category }) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            {/* Published */}
            <button onClick={() => setPublished(!published)}>
              {published ? (
                <MdPublishedWithChanges color="green" />
              ) : (
                <MdOutlineUnpublished />
              )}
            </button>
            {/* Save */}
            <button
              onClick={handleSave}
              style={
                initialState === updatedState
                  ? { color: "black", fontWeight: "normal", opacity: "0.4" }
                  : { color: "crimson", fontWeight: "bold", opacity: "1" }
              }
              disabled={initialState === updatedState}
            >
              <IoSaveSharp />
            </button>
            {/* Editor */}
            <ClientOnly fallback={<div>Loading ...</div>}>
              <Editor onChange={setIsDraft}>{page!.content}</Editor>
            </ClientOnly>
          </>
        ) : (
          <ReadOnly>{page!.content}</ReadOnly>
        )}
      </section>
    </main>
  );
}
