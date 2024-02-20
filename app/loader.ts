import { LoaderFunctionArgs, json } from "@remix-run/node";
import withPriviledges from "./middlewares/withPriviledge";
import auth from "./services/auth.server";
import prisma from "./services/prisma.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          avatar: true,
          role: true,
        },
      })
    : null;

  const nav = await prisma.post.findMany({
    where: withPriviledges(user, {
      NOT: { OR: [{ type: "post" }, { category: "post" }] },
    }),
    select: {
      title: true,
      type: true,
      category: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const recursive = (data: any, parent: string) =>
    data
      .filter(({ category }: any) => category === parent)
      .map(({ title, type, category }: any) => ({
        title,
        type,
        category,
        children: recursive(data, title),
      }));

  return json({ id, user, nav: recursive(nav, "page") }, { headers });
};

export default loader;
