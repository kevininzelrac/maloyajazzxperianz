import { Prisma } from "@prisma/client";
import { LoaderFunctionArgs, defer } from "@remix-run/node";
import db from "~/db";
import withPriviledges from "~/middlewares/withPriviledge";
import auth from "~/services/auth.server";

export const config = { runtime: "edge" };

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  let author = new URL(request.url).searchParams.get("author");

  const user = await db.find.user({
    where: { id: id },
    select: { id: true, role: true },
  });

  return defer(
    {
      user: user,
      categories: await db.find.categories({
        where: { type: { title: "post" } },
        select: {
          id: true,
          title: true,
          _count: {
            select: {
              posts: {
                where: withPriviledges(user.data, {}),
              },
            },
          },
        } satisfies Prisma.CategorySelect,
      }),
      authors: await db.find.authors({
        select: {
          id: true,
          firstname: true,
          _count: {
            select: {
              posts: {
                where: withPriviledges(user.data, { type: { title: "post" } }),
              },
            },
          },
        },
      }),
      posts: db.find.deferredPosts({
        where: withPriviledges(user.data, {
          typeTitle: "post",
          category: params.category ? { title: params.category } : {},
          author: author ? { firstname: author } : {},
        }),
        //take: take,
        //skip: take * skip,
        orderBy: { createdAt: "desc" },
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
              role: true,
            },
          },
          _count: {
            select: { likes: true, comments: true },
          },
        },
      }),
    },
    { headers, status: 200 }
  );
};
export default loader;
