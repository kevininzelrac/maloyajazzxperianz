import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import ErrorBoundary from "~/components/errorBoundary";
import ErrorElement from "~/components/errorElement";
import Card from "~/components/card";
import styles from "./styles.css";
import { Suspense } from "react";
import loader from "./loader";
import Loading from "~/components/loading";
import Transition from "~/components/transition";

export { loader, ErrorBoundary };

export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({ params }) => [
  { title: params.category },
  { name: "description", content: params.category },
];

export default function Blog() {
  const { user, response } = useLoaderData<typeof loader>();
  //const { key, pathname } = useLocation();

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
