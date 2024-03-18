import { ActionFunctionArgs, json } from "@remix-run/node";
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

  if (request.method === "DELETE")
    return json(
      await db.delete.post({
        where: { id: String(formData.get("id")) },
        select: { id: true },
      })
    );

  return null;
};
export default action;
