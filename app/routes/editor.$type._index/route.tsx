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

export default function Category2() {
  const { user, categories } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const { pathname } = useLocation();
  let formRef = useRef<HTMLFormElement>(null);
  const { isAdmin } = usePriviledges(user.data);

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data?.error)
      formRef.current?.reset();
  }, [fetcher.state, fetcher.data]);

  return (
    <>
      <section>
        <Error data={categories}>
          {(data) => (
            <nav>
              {data!.map(({ id, title }) => (
                <div key={id}>
                  <NavLink to={pathname + "/" + title}>{title}</NavLink>
                  {isAdmin && <Delete id={id} type="category" />}
                </div>
              ))}
            </nav>
          )}
        </Error>
      </section>
      <fetcher.Form ref={formRef} method="post">
        <legend>or create a new category</legend>
        <ErrorFetchers />
        <input type="text" name="title" placeholder="enter title" />
        <button data-primary>Create</button>
      </fetcher.Form>
    </>
  );
}
