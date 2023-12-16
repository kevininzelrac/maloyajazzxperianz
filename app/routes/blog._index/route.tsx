import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import { Article } from "~/components/article";

import { loader } from "./loader";
export { loader };

import styles from "./styles.css";
import { LinksFunction } from "@remix-run/node";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Blog() {
  const { response } = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Await
        resolve={response}
        errorElement={
          <div style={{ color: "red" }}>
            Woops ! something weird just happened
          </div>
        }
      >
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
