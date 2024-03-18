import {
  NavLink,
  useFetcher,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";

import Error from "~/components/error";
import Delete from "~/components/tools/delete";
import ErrorFetchers from "~/components/errorFetcher";

import loader from "./loader";
import action from "./action";
import usePriviledges from "~/hooks/usePriviledges";
export { loader, action };

export default function Posts2() {
  const { user, posts } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const { pathname } = useLocation();
  const { isAdmin, isAuthor } = usePriviledges(user.data);
  let formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data?.error)
      formRef.current?.reset();
  }, [fetcher.state, fetcher.data]);

  return (
    <>
      <section>
        <Error data={posts}>
          {(data) => (
            <nav>
              {data!.map(({ id, title, author }) => (
                <div key={id}>
                  <NavLink to={pathname + "/" + title}>{title}</NavLink>
                  {(isAuthor(author.id) || isAdmin) && (
                    <Delete id={id} type="post" />
                  )}
                </div>
              ))}
            </nav>
          )}
        </Error>
      </section>
      <fetcher.Form ref={formRef} method="post">
        <legend>or create a new post</legend>
        <ErrorFetchers />
        <input type="text" name="title" placeholder="enter title" />
        <button data-primary>Create</button>
      </fetcher.Form>
    </>
  );
}
