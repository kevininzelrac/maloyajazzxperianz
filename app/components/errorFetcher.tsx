import { useFetchers } from "@remix-run/react";

export default function ErrorFetchers() {
  const fetchers = useFetchers();
  return (
    <>
      {fetchers.map(
        (fetcher, key) =>
          fetcher.data?.error && (
            <span key={key} data-error>
              {fetcher.data.error.message}
            </span>
          )
      )}
    </>
  );
}
