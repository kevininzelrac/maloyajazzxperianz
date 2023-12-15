import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { prisma } from "~/services/prisma.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  //const post = Object.fromEntries(await request.formData()) as FormData;
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;

  const data: {
    type: string;
    content: string;
    published: boolean;
    category?: string;
  } = {
    type: formData.get("type") as string,
    content: formData.get("content") as string,
    published: JSON.parse(formData.get("published") as string),
  };
  if (category) {
    data.category = category;
  }

  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: data,
  });

  if (category) {
    if (data.type === "post")
      return redirect("/blog/" + category + "/" + title + "/Edit");
    return redirect("/" + title + "/Edit");
  }

  return json({ post });
};
