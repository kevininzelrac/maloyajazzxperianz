import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import Transition from "~/components/transition";
import Loading from "~/components/loading";
import ErrorElement from "~/components/errorElement";

import loader from "../loader";

const Likes = () => {
  const { likes } = useLoaderData<typeof loader>();
  return (
    <Transition>
      <article className="likes">
        <h2>Likes</h2>
        <Suspense fallback={<Loading />}>
          <Await resolve={likes} errorElement={<ErrorElement />}>
            {(likes) =>
              !likes.length ? (
                <span data-info>No Likes Found</span>
              ) : (
                likes.map(({ id, author, createdAt, post, comment }) => (
                  <section key={id}>
                    <h3>{author.firstname}</h3>
                    <time>
                      Created on&nbsp;
                      {new Date(createdAt).toLocaleDateString("fr")}
                    </time>
                    <p>{post?.title}</p>
                    <p>{comment?.content}</p>
                  </section>
                ))
              )
            }
          </Await>
        </Suspense>
      </article>
    </Transition>
  );
};
export default Likes;
