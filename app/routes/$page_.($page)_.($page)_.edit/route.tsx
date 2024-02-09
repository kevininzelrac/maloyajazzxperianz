import { useFetcher, useLoaderData, useLocation } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

import Editor from "~/components/slate/editor";
import ClientOnly from "~/utils/clientOnly";

import { loader } from "./loader";
import { action } from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

export const meta: MetaFunction = ({ params }) => [
  { title: "edit " + params.page },
  { name: "description", content: "edit " + params.page },
];

import { IoSaveSharp } from "react-icons/io5";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdOutlineUnpublished } from "react-icons/md";
import Back from "~/components/back";

export default function Index() {
  const { page, categories } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
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

  const Save = () => {
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
    );
  };

  return (
    <main>
      <section className="slate">
        <header>
          <Back />
          <div className="title">
            <h3>{page?.title}</h3>
            <span>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="page">page</option>
                <option value="post">post</option>
                <option value="category">category</option>
              </select>
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
              <button onClick={() => setPublished(!published)}>
                {published ? (
                  <MdPublishedWithChanges color="green" />
                ) : (
                  <MdOutlineUnpublished />
                )}
              </button>
              <Save />
            </span>
          </div>
        </header>
        <ClientOnly fallback={<div>Loading ...</div>}>
          <Editor onChange={setIsDraft}>{page!.content}</Editor>
        </ClientOnly>
      </section>
    </main>
  );
}
