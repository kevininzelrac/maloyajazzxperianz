import { Type } from "@prisma/client";
import { ActionFunctionArgs, json } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type") as Type["title"];
  const id = String(formData.get("id"));
  formData.delete("type");
  formData.delete("id");

  if (request.method === "PATCH") {
    if (type === "post" || type === "page") {
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
    if (type === "user") {
      return json(
        await withTryCatch(
          prisma.user.update({
            where: { id },
            data: Object.fromEntries(formData),
            select: { id: true },
          }),
          "Failed to update user."
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
