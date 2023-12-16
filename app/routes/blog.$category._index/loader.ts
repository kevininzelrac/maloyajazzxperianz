import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { auth } from "~/services/auth/index.server";
import { prisma } from "~/services/prisma.server";

type Posts = {
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  author: {
    firstname: string;
    lastname: string;
    avatar: string;
  };
}[];

export const config = { runtime: "edge" };

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const getPostsByCategory = async (): Promise<Posts> => {
    return prisma.post.findMany({
      where: id
        ? {
            type: "post",
            category: params.category,
          }
        : {
            type: "post",
            category: params.category,
            published: true,
          },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        title: true,
        content: true,
        category: true,
        createdAt: true,
        author: {
          select: {
            firstname: true,
            lastname: true,
            avatar: true,
          },
        },
      },
    });
  };

  return defer({ response: getPostsByCategory() }, { headers });
};
