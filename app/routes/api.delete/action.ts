import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/services/prisma.server";

type FormData = {
  //[key: string]: string;
  type: string;
  id: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const post = Object.fromEntries(await request.formData()) as FormData;

  await prisma.post.delete({
    where: {
      id: post.id,
    },
  });
  if (post.type === "post") return redirect("/blog");
  return redirect("/");
};
