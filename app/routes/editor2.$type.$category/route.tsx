import { Form, Outlet, useOutletContext, useParams } from "@remix-run/react";
import action from "./action";
import { contextType } from "../editor2/route";
export { action };

export default function Category() {
  const { category, post } = useParams();
  const context = useOutletContext<contextType>();
  const params = useParams();

  return (
    <>
      {post ? (
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
          <h2>{params.type + " / " + params.category}</h2>
          <Form method="post">
            <legend>Create a new post</legend>
            <input type="hidden" name="id" value={context.user.id} />
            <input type="text" name="title" placeholder="enter title" />
            <button data-primary>Create</button>
          </Form>
        </article>
      )}
    </>
  );
}
