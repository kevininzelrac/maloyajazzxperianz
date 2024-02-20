import { useAsyncError } from "@remix-run/react";

export default function ErrorElement() {
  const error: any = useAsyncError();
  return (
    <p
      style={{
        width: "100%",
        background: "ghostwhite",
        padding: "1rem",
        color: "crimson",
      }}
    >
      {error.message}
    </p>
  );
}
