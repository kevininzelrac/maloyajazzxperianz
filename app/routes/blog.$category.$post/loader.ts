import { LoaderFunctionArgs, json } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user
        .findUnique({
          where: { id },
          select: {
            id: true,
            role: true,
          },
        })
        .catch(() => null)
    : null;

  const post = await prisma.post.findUnique({
    where: {
      //id: "te",
      typeTitle: params.type || "post",
      categoryTitle: params.category,
      title: params.post,
    },
    select: {
      id: true,
      title: true,
      content: true,
      status: true,
      audience: true,
      createdAt: true,
      type: {
        select: {
          title: true,
        },
      },
      category: {
        select: {
          title: true,
        },
      },
      author: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          avatar: true,
        },
      },
    },
  });
  if (!post)
    throw json(null, {
      status: 404,
      statusText: "Post Not Found",
    });

  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
      status: user?.role !== "ADMIN" ? "PUBLISHED" : undefined,
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      parentId: true,
      status: true,
      content: true,
      author: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          avatar: true,
          role: true,
        },
      },
      likes: {
        select: {
          id: true,
          author: {
            select: {
              id: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  const recursive: (root: typeof comments, parent: string) => any[] = (
    root,
    parent
  ) =>
    root
      .filter(({ parentId }: any) => parentId === parent)
      .map((comment: any) => ({
        ...comment,
        children: recursive(root, comment.id),
      }));

  return json(
    {
      user,
      post,
      comments: recursive(comments, post.id),
    },
    { headers }
  );
};
export default loader;
