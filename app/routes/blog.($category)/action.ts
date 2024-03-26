import { Type } from "@prisma/client";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id: userId } = await auth(request);
  const formData = await request.formData();
  const type = formData.get("type") as Type["title"];
  const id = String(formData.get("id"));
  formData.delete("type");
  formData.delete("id");

  if (request.method === "POST") {
    if (formData.get("category")) {
      const category = String(formData.get("category"));
      const post = await withTryCatch(
        prisma.post.create({
          data: {
            type: { connect: { title: "post" } },
            category: { connect: { title: category } },
            author: { connect: { id: userId } },
            title: String(formData.get("title")),
            content: "enter content here",
          },
          select: { id: true, title: true },
        }),
        "Failed to create post."
      );
      if (post.error) return json(post, { status: 500 });
      return redirect(`/editor/post/${category}/${post.data.title}`);
    }

    return json(
      await withTryCatch(
        prisma.category.create({
          data: {
            type: { connect: { title: "post" } },
            title: String(formData.get("title")),
          },
          select: { id: true, title: true },
        }),
        "Failed to create category."
      )
    );
  }
  if (request.method === "PATCH") {
    return json(
      await withTryCatch(
        prisma.post.update({
          where: { id },
          data: Object.fromEntries(formData),
          select: { id: true, content: true },
        }),
        "Failed to update post."
      )
    );
  }
  if (request.method === "DELETE") {
    if (type === "post") {
      return json(
        await withTryCatch(
          prisma.post.delete({
            where: { id },
            select: { id: true },
          }),
          "Failed to delete post."
        )
      );
    }
    if (type === "category") {
      const category = await withTryCatch(
        prisma.category.delete({
          where: { id },
          select: { id: true, title: true },
        }),
        "Failed to delete category."
      );
      if (category.error) return json(category, { status: 500 });
      if (params.category === category.data.title) return redirect("/blog");
      return json(category);
    }
  }
  return null;
};
export default action;
