import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";
import { Type } from "@prisma/client";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type") as Type["title"];
  const id = String(formData.get("id"));
  formData.delete("type");
  formData.delete("id");

  if (request.method === "PATCH")
    return json(
      await withTryCatch(
        prisma.post.update({
          where: { id },
          data: Object.fromEntries(formData),
          select: { id: true, content: true },
        }),
        "Failed to update post"
      )
    );

  if (request.method === "DELETE") {
    const post = await withTryCatch(
      prisma.post.delete({
        where: { id },
        select: { id: true },
      }),
      "Failed to delete post"
    );
    if (post.error) return json(post, { status: 500 });
    if (type === "post") return redirect("/blog");
    if (type === "page") return redirect("/");
  }
  return null;
};
export default action;
