import { LoaderFunctionArgs, defer } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";
import withPriviledges from "~/middlewares/withPriviledge";
import sleep from "~/utils/sleep";

export const config = { runtime: "edge" };

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true },
      })
    : undefined;

  //let where = {
  //  type: "post",
  //  category: params.category,
  //};

  const response = Promise.resolve().then(async () => {
    //await sleep;
    return prisma.post.findMany({
      where: withPriviledges(user, {
        type: "post",
        category: params.category,
      }),
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
    });
  });

  await Promise.race([sleep, response]);
  return defer({ user, response }, { headers });
};
export default loader;
