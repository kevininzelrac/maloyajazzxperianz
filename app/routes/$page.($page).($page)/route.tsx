import { useLoaderData, useLocation } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { loader } from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

import ReadOnly from "~/components/slate/readOnly";

export const meta: MetaFunction = ({ params }) => [
  { title: params.page },
  { name: "description", content: params.page },
];

import Delete from "~/components/delete";
import Edit from "~/components/edit";
import Published from "~/components/published";

export default function Index() {
  const { id, page } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();

  return (
    <section key={pathname} className="slate">
      <header>
        <div className="title">
          <h3>{page!.title}</h3>
          {id === page!.authorId ? (
            <span>
              <Published published={page!.published!} />
              <Edit to={pathname} />
              <Delete id={page!.id} type={page!.type} />
            </span>
          ) : null}
        </div>
        {id ? (
          <div className="metadata">
            <b>{page!.category}</b>
            {"  "}
            <time>
              <i>
                écrit le {new Date(page!.createdAt!).toLocaleDateString("fr")}
              </i>
            </time>
          </div>
        ) : null}
      </header>
      <article>
        <ReadOnly>{page?.content}</ReadOnly>
      </article>
    </section>
  );
}
