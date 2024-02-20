import { Form } from "@remix-run/react";

export default function Buy({
  item,
  amount,
}: {
  item: string;
  amount: number;
}) {
  return (
    <Form method="post" action="/api/checkout">
      <input type="hidden" name="item" value={item} />
      <input type="hidden" name="amount" value={amount} />
      <button type="submit" className="primary">
        Buy
      </button>
    </Form>
  );
}
