import { LoaderFunctionArgs, json } from "@remix-run/node";
import prisma from "~/services/prisma.server";
import auth from "~/services/auth.server";
import sleep from "~/utils/sleep";
import withPriviledges from "~/middlewares/withPriviledge";

const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          role: true,
        },
      })
    : undefined;

  const page = await prisma.post.findFirst({
    where: withPriviledges(user!, {
      title: params.page,
      NOT: { OR: [{ type: "post" }, { category: "post" }] },
    }),
    select: {
      id: true,
      type: true,
      title: true,
      content: true,
      category: true,
      createdAt: true,
      status: true,
      audience: true,
      authorId: true,
      author: {
        select: {
          firstname: true,
          lastname: true,
          avatar: true,
          role: true,
        },
      },
    },
  });

  if (!page) {
    throw json(null, {
      status: 404,
      statusText: "Page Not Found",
    });
  }

  /* 
  ??????????
  if (id !== page?.authorId)
    throw json(null, {
      status: 403,
      statusText: "Forbidden",
    });
  */

  await Promise.race([sleep, page]);
  return json({ user, page }, { headers });
};
export default loader;
