import { useSubmit } from "@remix-run/react";

export default function Buy({
  item,
  amount,
}: {
  item: string;
  amount: number;
}) {
  const submit = useSubmit();
  return (
    <button
      data-primary
      onClick={() => {
        submit(
          { item, amount },
          {
            action: "/api/checkout",
            method: "post",
          }
        );
      }}
    >
      Buy
    </button>
  );
}
