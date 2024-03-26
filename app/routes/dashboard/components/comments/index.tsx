import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import Transition from "~/components/transition";
import Loading from "~/components/loading";
import ErrorElement from "~/components/errorElement";

import loader from "../../loader";
import Comment from "./comment";

const Comments = () => {
  const { comments } = useLoaderData<typeof loader>();
  return (
    <Transition>
      <article className="comments">
        <h2>Comments</h2>
        <Suspense fallback={<Loading />}>
          <Await resolve={comments} errorElement={<ErrorElement />}>
            {(comments) =>
              !comments.length ? (
                <span data-info>No Comments Found</span>
              ) : (
                comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))
              )
            }
          </Await>
        </Suspense>
      </article>
    </Transition>
  );
};
export default Comments;
