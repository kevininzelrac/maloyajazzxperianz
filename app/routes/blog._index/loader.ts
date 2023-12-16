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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const getPosts = async (): Promise<Posts> => {
    //await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    return prisma.post.findMany({
      where: id ? { type: "post" } : { type: "post", published: true },
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

  return defer({ response: getPosts() }, { headers });
};
