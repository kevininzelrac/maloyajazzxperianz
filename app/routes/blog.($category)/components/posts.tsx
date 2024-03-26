import { Await, useLoaderData, useLocation } from "@remix-run/react";
import loader from "../loader";
import Transition from "~/components/transition";
import { Suspense } from "react";
import Loading from "~/components/loading";
import ErrorElement from "~/components/errorElement";
import Card from "./card";

const Posts = () => {
  const { user, posts } = useLoaderData<typeof loader>();
  const { key } = useLocation();
  return (
    <Transition>
      <section>
        <Suspense fallback={<Loading />} key={key}>
          <Await
            resolve={posts}
            errorElement={
              <article>
                <ErrorElement />
              </article>
            }
          >
            {(posts) =>
              !posts.length ? (
                <article data-info>No posts found</article>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} user={user} post={post} />
                ))
              )
            }
          </Await>
        </Suspense>
      </section>
    </Transition>
  );
};
export default Posts;
