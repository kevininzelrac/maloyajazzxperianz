import { useFetcher, useLoaderData } from "@remix-run/react";
import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
import GoogleSign from "~/components/googleSign";

export { loader, action, ErrorBoundary };

export default function Signin() {
  const { client_id } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  let isIdle = fetcher.state === "idle";
  //let isSumitting = fetcher.state === "submitting";
  //let isLoading = fetcher.state === "loading";

  return (
    <>
      <fetcher.Form method="post">
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button className="primary" type="submit">
          submit
        </button>
      </fetcher.Form>
      {!isIdle ? <span>{fetcher.state}</span> : null}

      {fetcher.data?.error ? (
        <span style={{ color: "red" }}>{fetcher.data.error}</span>
      ) : null}
      <div>or</div>
      <GoogleSign client_id={client_id} />
    </>
  );
}
