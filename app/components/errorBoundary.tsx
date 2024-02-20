import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div
      className="error"
      style={{
        width: "100%",
        background: "ghostwhite",
        padding: "1rem",
        color: "crimson",
      }}
    >
      <h2>Woops!</h2>
      <p>
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : error instanceof Error
          ? error.message
          : "Unknown Error"}
      </p>
    </div>
  );
}
