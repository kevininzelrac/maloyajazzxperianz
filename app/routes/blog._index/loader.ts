import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { auth } from "~/services/auth/index.server";
import { prisma } from "~/services/prisma.server";

export const config = { runtime: "edge" };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const response = Promise.resolve().then(() =>
    prisma.post.findMany({
      where: id ? { type: "post" } : { type: "post", published: true },
      select: {
        id: true,
        type: true,
        category: true,
        title: true,
        content: true,
        createdAt: true,
        published: true,
        authorId: true,
        author: {
          select: {
            firstname: true,
            lastname: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  );

  return defer({ id, response }, { headers });
};

/* const getPosts = async (): Promise<PostWithAuthor[]> => {
  //await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  return prisma.post.findMany({
    where: id ? { type: "post" } : { type: "post", published: true },
    select: {
      type: true,
      title: true,
      content: true,
      category: true,
      createdAt: true,
      published: true,
      authorId: true,
      author: {
        select: {
          firstname: true,
          lastname: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}; */
