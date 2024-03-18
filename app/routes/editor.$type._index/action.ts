import { ActionFunctionArgs, json } from "@remix-run/node";
import db from "~/db";

const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  if (request.method === "POST")
    return json(
      await db.create.category({
        data: {
          type: { connect: { title: params.type } },
          title: String(formData.get("title")),
        },
        select: { id: true },
      })
    );

  if (request.method === "DELETE")
    return json(
      await db.delete.category({
        where: { id: String(formData.get("id")) },
        select: { id: true },
      })
    );

  return null;
};
export default action;
