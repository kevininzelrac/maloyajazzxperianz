import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/db";

const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  if (request.method === "POST")
    return json(
      await db.update.post({
        where: {
          id: String(formData.get("id")),
        },
        data: Object.fromEntries(formData),
        select: { id: true, content: true },
      })
    );

  if (request.method === "DELETE") {
    const type = formData.get("type");

    if (type === "category") {
      return json(
        await db.delete.category({
          where: { id: String(formData.get("id")) },
          select: { id: true },
        })
      );
    }

    if (type === "post") {
      const post = await db.delete.post({
        where: {
          id: String(formData.get("id")),
        },
        select: { id: true },
      });
      if (post.error) return json(post, { status: 500 });
      return redirect(`/editor2/${params.type}/${params.category}`);
    }
  }

  return null;
};
export default action;
