import { useFetcher, useLoaderData, useLocation } from "@remix-run/react";
import { useState } from "react";

import { loader } from "./loader";
import { action } from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

import Editor from "~/components/slate/editor";
import ClientOnly from "~/utils/clientOnly";
import { IoSaveSharp } from "react-icons/io5";

import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [{ title: "Home" }, { name: "description", content: "Home" }];
};

export default function Index() {
  const { id, categories } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const { pathname } = useLocation();
  const path = pathname.replace("/Edit", "");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("post");
  const [category, setCategory] = useState(categories[0].category);
  const [isDraft, setIsDraft] = useState(false);

  const handleSave = async () => {
    fetcher.submit(
      {
        authorId: id,
        type,
        title,
        category,
        content: localStorage.getItem("slate" + path),
      },
      { method: "post" }
    );
    localStorage.removeItem("slate" + path);
    setIsDraft(false);
  };

  return (
    <main>
      <section className="slate">
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="page">page</option>
          <option value="post">post</option>
          <option value="category">category</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories
            .filter((item: any) => item.type === type)
            .map(({ category }) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
        <button
          onClick={handleSave}
          style={
            isDraft && title
              ? { color: "crimson", fontWeight: "bold", opacity: "1" }
              : { color: "black", fontWeight: "normal", opacity: "0.4" }
          }
          disabled={!isDraft || !title}
        >
          <IoSaveSharp />
        </button>
        <ClientOnly fallback={<div>Loading ...</div>}>
          <Editor onChange={setIsDraft}>insert text here</Editor>
        </ClientOnly>
      </section>
    </main>
  );
}
