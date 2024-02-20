import { Post, Prisma } from "@prisma/client";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import prisma from "~/services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as Post["id"];
  const type = formData.get("type") as Post["type"];
  const title = formData.get("title") as Post["title"];
  const status = formData.get("status") as Post["status"];
  const category = formData.get("category") as Post["category"];
  const content = formData.get("content") as Post["content"];

  const data: Prisma.PostUpdateInput = {
    id,
    type,
    title,
    status,
    content,
  };
  if (category) data.category = category;

  const post = await prisma.post.update({
    where: {
      id: data.id as Post["id"],
    },
    data: data,
  });

  if (category) {
    if (type === "post")
      return redirect("/blog/" + category + "/" + title + "/Edit");
    return redirect("/" + title + "/Edit");
  }

  return json({ post });
};
export default action;
