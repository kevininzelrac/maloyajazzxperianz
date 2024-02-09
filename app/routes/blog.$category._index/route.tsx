import { Await, useLoaderData } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Suspense } from "react";

import { loader } from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

import ErrorElement from "~/components/errorElement";

import { Article } from "~/components/article";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({ params }) => [
  { title: params.category },
  { name: "description", content: params.category },
];

export default function Blog() {
  const { id, response } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Await resolve={response} errorElement={<ErrorElement />}>
        {(posts) =>
          posts.map((post) => (
            <Article key={post.title} post={post} userId={id} />
          ))
        }
      </Await>
    </Suspense>
  );
}
