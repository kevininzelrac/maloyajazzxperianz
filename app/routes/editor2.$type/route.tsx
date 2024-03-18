import { Form, Outlet, useOutletContext, useParams } from "@remix-run/react";
import { contextType } from "../editor2/route";

import action from "./action";
export { action };

export default function Category() {
  const { type, category } = useParams();
  const context = useOutletContext<contextType>();

  return (
    <>
      {category ? (
        <Outlet context={context} />
      ) : (
        <article
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <h2>{type}</h2>
          <Form method="post">
            <legend>Create a new category</legend>
            <input type="text" name="title" placeholder="enter title" />
            <button data-primary>Create</button>
          </Form>
        </article>
      )}
    </>
  );
}
