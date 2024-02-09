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
import Back from "~/components/back";
export const meta: MetaFunction = () => [
  { title: "Add" },
  { name: "description", content: "Add" },
];

export default function Index() {
  const { id, categories } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const { pathname } = useLocation();
  const path = pathname.replace("/Edit", "");
  const [isDraft, setIsDraft] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("post");
  const [category, setCategory] = useState(categories[0].title);

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    const cat = categories.filter(
      (item: any) => item.category === e.target.value
    )[0];
    if (!cat) {
      setCategory("");
      return;
    }
    setCategory(cat.title);
  };

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
      <Back />
      <section className="slate">
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={type} onChange={handleType}>
          <option value="page">page</option>
          <option value="post">post</option>
          <option value="category">category</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories
            .filter((item: any) => item.category === type)
            .map(({ title }) => (
              <option key={title} value={title}>
                {title}
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
