import { LoaderFunctionArgs, defer } from "@remix-run/node";
import withPriviledges from "~/middlewares/withPriviledge";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

export const config = { runtime: "edge" };

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true },
      })
    : undefined;

  const response = Promise.resolve().then(async () => {
    return prisma.post.findMany({
      where: withPriviledges(user!, { type: "post" }),
      select: {
        id: true,
        type: true,
        category: true,
        title: true,
        content: true,
        createdAt: true,
        status: true,
        audience: true,
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
  });

  //await Promise.race([sleep, response]);
  await sleep;
  return defer({ user, response }, { headers });
};
export default loader;
