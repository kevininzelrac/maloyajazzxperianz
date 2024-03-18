import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/db";
import auth from "~/services/auth.server";

const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = await auth(request);
  const formData = await request.formData();

  if (request.method === "POST") {
    const newPost = await db.create.post({
      data: {
        type: { connect: { title: params.type } },
        category: { connect: { title: params.category } },
        author: { connect: { id } },
        title: String(formData.get("title")),
        content: "enter content here",
      },
      select: { id: true, title: true },
    });
    if (newPost.error)
      return json({ error: newPost.error.message }, { status: 400 });

    return redirect(
      `/editor2/${params.type}/${params.category}/${newPost.data.title}`
    );
  }

  return null;
};
export default action;
