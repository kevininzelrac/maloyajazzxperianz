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
    const type = formData.get("type");
    const redirectUrl = String(formData.get("redirect"));

    if (type === "category") {
      await db.delete.category({
        where: { id: String(formData.get("id")) },
        select: { id: true },
      });
      return redirect(redirectUrl);
    }
    if (type === "post") {
      await db.delete.post({
        where: {
          id: String(formData.get("id")),
        },
        select: { id: true },
      });
      return redirect(redirectUrl);
    }
  }

  return null;
};
export default action;
