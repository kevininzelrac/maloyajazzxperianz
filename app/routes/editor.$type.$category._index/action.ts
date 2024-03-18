import { ActionFunctionArgs, json } from "@remix-run/node";
import db from "~/db";
import auth from "~/services/auth.server";

const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = await auth(request);
  const formData = await request.formData();

  if (request.method === "POST")
    return json(
      await db.create.post({
        data: {
          type: { connect: { title: params.type } },
          category: { connect: { title: params.category } },
          author: { connect: { id } },
          title: String(formData.get("title")),
          content: "enter content here",
        },
        select: { id: true },
      })
    );

  if (request.method === "DELETE")
    return json(
      await db.delete.post({
        where: {
          id: String(formData.get("id")),
        },
        select: { id: true },
      })
    );

  return null;
};
export default action;
