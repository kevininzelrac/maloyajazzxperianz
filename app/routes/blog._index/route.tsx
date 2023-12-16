import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import { Article } from "~/components/article";

import { loader } from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

import ErrorElement from "~/components/errorElement";

import styles from "./styles.css";
import { LinksFunction } from "@remix-run/node";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Blog() {
  const { response } = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Await resolve={response} errorElement={<ErrorElement />}>
        {(posts) => (
          <section>
            {posts.map((post) => (
              <Article key={post.title} post={post} />
            ))}
          </section>
        )}
      </Await>
    </Suspense>
  );
}
