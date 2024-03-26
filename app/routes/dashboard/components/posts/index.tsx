import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import Transition from "~/components/transition";
import Loading from "~/components/loading";
import ErrorElement from "~/components/errorElement";

import loader from "../../loader";
import Post from "./post";

const Posts = () => {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <Transition>
      <article className="posts">
        <h2>Posts</h2>
        <Suspense fallback={<Loading />}>
          <Await resolve={posts} errorElement={<ErrorElement />}>
            {(posts) =>
              !posts.length ? (
                <span data-info>No Posts Found</span>
              ) : (
                posts.map((post) => <Post key={post.id} post={post} />)
              )
            }
          </Await>
        </Suspense>
      </article>
    </Transition>
  );
};
export default Posts;
