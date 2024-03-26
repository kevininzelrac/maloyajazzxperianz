import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <>
      {isRouteErrorResponse(error) ? (
        error.status >= 400 && error.status <= 499 ? (
          <article data-warning>
            {error.status} {error.statusText}
          </article>
        ) : error.status >= 500 && error.status <= 599 ? (
          <article data-error>
            {error.status} {error.statusText}
          </article>
        ) : null
      ) : error instanceof Error ? (
        <article data-error>{error.message}</article>
      ) : (
        <article data-error>Unknown Error</article>
      )}
    </>
  );
}
