import { LoaderFunctionArgs, json } from "@remix-run/node";
import { prisma } from "~/services/prisma.server";
import { auth } from "~/services/auth/index.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const post = await prisma.post.findFirst({
    where: {
      type: "post",
      category: params.category,
      title: params.post,
    },
    select: {
      id: true,
      type: true,
      title: true,
      content: true,
      category: true,
      createdAt: true,
      authorId: true,
      author: {
        select: {
          firstname: true,
          lastname: true,
          avatar: true,
        },
      },
    },
  });
  return json({ post, id }, { headers });
};
