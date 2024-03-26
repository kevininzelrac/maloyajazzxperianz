import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import Transition from "~/components/transition";
import Loading from "~/components/loading";
import ErrorElement from "~/components/errorElement";

import loader from "../../loader";
import User from "./user";

const Users = () => {
  const { user, users } = useLoaderData<typeof loader>();

  return (
    <Transition>
      <article className="users">
        <h2>Users</h2>
        <Suspense fallback={<Loading />}>
          <Await resolve={users} errorElement={<ErrorElement />}>
            {(data) =>
              !data.length ? (
                <span data-info>No Users Found</span>
              ) : (
                data
                  .filter((_user) => _user.id !== user.id)
                  .map((_user) => <User key={_user.id} user={_user} />)
              )
            }
          </Await>
        </Suspense>
      </article>
    </Transition>
  );
};
export default Users;
