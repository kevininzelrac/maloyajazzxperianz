import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Type } from "@prisma/client";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type") as Type["title"];
  const id = String(formData.get("id"));
  formData.delete("type");
  formData.delete("id");

  if (request.method === "POST") {
    if (type === "like") {
      return json(
        await withTryCatch(
          prisma.like.create({
            data: {
              author: { connect: { id } },
              comment: {
                connect: {
                  id: String(formData.get("commentId")),
                },
              },
            },
            select: { id: true },
          }),
          "Failed to create like."
        )
      );
    }
    if (type === "comment") {
      return json(
        await withTryCatch(
          prisma.comment.create({
            data: {
              author: { connect: { id } },
              post: { connect: { id: String(formData.get("postId")) } },
              parentId: String(formData.get("parentId")),
              content: String(formData.get("content")),
            },
            select: { id: true },
          }),
          "Failed to create comment."
        )
      );
    }
  }

  if (request.method === "PATCH") {
    if (type === "post") {
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
    if (type === "comment") {
      return json(
        await withTryCatch(
          prisma.comment.update({
            where: { id },
            data: Object.fromEntries(formData),
            select: { id: true },
          }),
          "Failed to update comment."
        )
      );
    }
  }
  if (request.method === "DELETE") {
    if (type === "post") {
      const post = await withTryCatch(
        prisma.post.delete({
          where: { id },
          select: { id: true },
        }),
        "Failed to delete post."
      );
      if (post.error) return json(post, { status: 500 });
      return redirect("/blog");
    }
    if (type === "like") {
      return json(
        await withTryCatch(
          prisma.like.delete({
            where: {
              commentId_authorId: {
                authorId: id,
                commentId: String(formData.get("commentId")),
              },
            },
          }),
          "Failed to delete like."
        )
      );
    }
    if (type === "comment") {
      const recursiveDelete = async (id: string) => {
        const comment = await withTryCatch(
          prisma.comment.delete({
            where: { id: id },
            select: { id: true },
          }),
          "Failed to delete comment."
        );
        if (comment.error) throw comment;

        const children = await withTryCatch(
          prisma.comment.findMany({
            where: { parentId: comment.data.id },
            select: { id: true },
          }),
          "Failed to delete nested likes."
        );
        if (children.error) throw children;

        for (const child of children.data) {
          await recursiveDelete(child.id);
        }

        return comment;
      };
      return json(await recursiveDelete(id));
    }
  }

  return null;
};
export default action;
