import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/db";

const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  if (request.method === "POST") {
    const newCategory = await db.create.category({
      data: {
        type: { connect: { title: params.type } },
        title: String(formData.get("title")),
      },
      select: { id: true, title: true },
    });

    if (newCategory.error)
      return json({ error: newCategory.error.message }, { status: 400 });

    return redirect(`/editor2/${params.type}/${newCategory.data?.title}`);
  }

  return null;
};
export default action;
