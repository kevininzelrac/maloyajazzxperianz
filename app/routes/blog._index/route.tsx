import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import loader from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
import ErrorElement from "~/components/errorElement";
import Card from "~/components/card";
import styles from "./styles.css";
import responsive from "./responsive.css";
import Loading from "~/components/loading";
import Transition from "~/components/transition";

export { loader, ErrorBoundary };

export let links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: responsive },
];

export const meta: MetaFunction = () => [
  { title: "blog" },
  { name: "description", content: "blog" },
];

export default function Blog() {
  const { user, response } = useLoaderData<typeof loader>();
  //const { key } = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={response} errorElement={<ErrorElement />}>
        {(posts) => {
          return (
            <Transition>
              <div className="post-list">
                {posts.map((post) => (
                  <Card key={post.id} post={post} user={user!} />
                ))}
              </div>
            </Transition>
          );
        }}
      </Await>
    </Suspense>
  );
}
