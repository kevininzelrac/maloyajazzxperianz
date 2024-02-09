import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { loader } from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

import ReadOnly from "~/components/slate/readOnly";

export const meta: MetaFunction = ({ params }) => [
  { title: params.post },
  { name: "description", content: params.post },
];

import Badge from "~/components/badge";
import Edit from "~/components/edit";
import Delete from "~/components/delete";
import Back from "~/components/back";
import Published from "~/components/published";

export default function Index() {
  const { id, post } = useLoaderData<typeof loader>();

  return (
    <section className="slate">
      <Back />
      <header>
        <div className="title">
          <h3>{post!.title}</h3>
          {id === post!.authorId ? (
            <span>
              <Published published={post!.published} />
              <Edit to={"/blog/" + post!.category + "/" + post!.title} />
              <Delete id={post!.id} type={post!.type} />
            </span>
          ) : null}
        </div>
        <div className="metadata">
          category <b>{post!.category} </b>
          <time>
            <i>écrit le {new Date(post!.createdAt).toLocaleDateString("fr")}</i>
          </time>
        </div>
        <Badge author={post!.author} />
      </header>
      <article>
        <ReadOnly>{post?.content}</ReadOnly>
      </article>
    </section>
  );
}
