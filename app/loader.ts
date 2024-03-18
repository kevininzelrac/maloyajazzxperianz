import { LoaderFunctionArgs, json } from "@remix-run/node";
import withPriviledges from "./middlewares/withPriviledge";
import auth from "./services/auth.server";
import db from "./db";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = await db.find.user({
    where: { id },
    select: { id: true, role: true, avatar: true },
  });

  const nav = await db.find.posts({
    where: withPriviledges(user.data, {
      NOT: {
        OR: [{ type: { title: "post" } }, { category: { title: "post" } }],
      },
    }),
    orderBy: { createdAt: "asc" },
    select: {
      title: true,
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
    },
  });

  const recursive = (data: any, parent: string) =>
    data
      .filter(({ category }: any) => category.title === parent)
      .map(({ title, type, category }: any) => ({
        title,
        type: type.title,
        category: category.title,
        children: recursive(data, title),
      }));

  return json(
    { id, user: user.data, nav: recursive(nav.data, "default") },
    { headers }
  );
};

export default loader;
