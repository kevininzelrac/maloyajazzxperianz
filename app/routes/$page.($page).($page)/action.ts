import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/db";

const action = async ({ request }: ActionFunctionArgs) => {
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
    const page = await db.delete.post({
      where: { id: String(formData.get("id")) },
      select: { id: true },
    });
    if (page.error) return json({ error: page.error.message }, { status: 400 });
    return redirect("/");
  }

  return null;
};
export default action;
