import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/services/prisma.server";

type FormData = {
  //[key: string]: string;
  authorId: string;
  type: string;
  title: string;
  category: string;
  content: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const post = Object.fromEntries(await request.formData()) as FormData;

  await prisma.post.create({
    data: post,
  });

  if (post.type === "post")
    return redirect("/blog/" + post.category + "/" + post.title + "/Edit");

  return redirect("/" + post.title + "/Edit");
};
