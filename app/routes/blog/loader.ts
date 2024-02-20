import { LoaderFunctionArgs, json } from "@remix-run/node";
import withPriviledges from "~/middlewares/withPriviledge";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  const user = id
    ? await prisma.user.findUnique({
        where: { id },
        select: { id: true, role: true },
      })
    : undefined;

  const categories = await prisma.post.findMany({
    where: withPriviledges(user, {
      type: "category",
      category: "post",
    }),
    select: {
      id: true,
      title: true,
    },
    distinct: "title",
    orderBy: {
      title: "asc",
    },
  });

  return json({ id, categories }, { headers });
};
export default loader;
