import { useFetcher, useLoaderData } from "@remix-run/react";

import GoogleSign from "~/components/googleSign";
import ErrorBoundary from "~/components/errorBoundary";

import loader from "./loader";
import action from "./action";
export { loader, action, ErrorBoundary };

export default function Signin() {
  const { client_id } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  let isIdle = fetcher.state === "idle";

  return (
    <>
      <fetcher.Form method="post">
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button data-primary>submit</button>
      </fetcher.Form>
      {!isIdle ? <span>{fetcher.state}</span> : null}

      {fetcher.data?.error && <span data-error>{fetcher.data.error}</span>}
      <div>or</div>
      <GoogleSign client_id={client_id} />
    </>
  );
}
