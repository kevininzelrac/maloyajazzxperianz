import { ActionFunctionArgs, redirect } from "@remix-run/node";
import prisma from "~/services/prisma.server";

type FormData = {
  //[key: string]: string;
  type: string;
  id: string;
};

const action = async ({ request }: ActionFunctionArgs) => {
  const post = Object.fromEntries(await request.formData()) as FormData;

  await deletePost(post.id);
  if (post.type === "post") return redirect("/blog");
  return redirect("/");
};

const deletePost = async (id: string) => {
  const categoryPost = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!categoryPost) {
    throw new Error(`category post with id ${id} not found.`);
  }

  const children = await prisma.post.findMany({
    where: {
      category: categoryPost.title,
    },
  });

  for (const child of children) {
    await deletePost(child.id);
  }

  return await prisma.post.delete({
    where: {
      id: id,
    },
  });
};
export default action;
