import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { auth } from "~/services/auth/index.server";
import { prisma } from "~/services/prisma.server";

export const config = { runtime: "edge" };

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const response = Promise.resolve().then(() =>
    prisma.post.findMany({
      where: {
        type: "post",
        category: params.category,
        published: id ? {} : true,
      },
      orderBy: {
        createdAt: "desc",
      },
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
    })
  );

  return defer({ id, response }, { headers });
};

// const getPostsByCategory = async (): Promise<PostWithAuthor[]> => {
//   return prisma.post.findMany({
//     where: id
//       ? {
//           type: "post",
//           category: params.category,
//         }
//       : {
//           type: "post",
//           category: params.category,
//           published: true,
//         },
//     orderBy: {
//       createdAt: "desc",
//     },
//     select: {
//       title: true,
//       category: true,
//       content: true,
//       createdAt: true,
//       published: true,
//       authorId: true,
//       author: {
//         select: {
//           firstname: true,
//           lastname: true,
//           avatar: true,
//         },
//       },
//     },
//   });
// };
