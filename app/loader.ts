import { LoaderFunctionArgs, json } from "@remix-run/node";
import withPriviledges from "./middlewares/withPriviledge";
import auth from "./services/auth.server";
import prisma from "./services/prisma.server";
import withTryCatch from "./middlewares/withTryCatch";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user
        .findUnique({
          where: { id },
          select: { id: true, role: true, firstname: true, avatar: true },
        })
        .catch(() => null)
    : null;

  const pages = await withTryCatch(
    prisma.post.findMany({
      where: withPriviledges(user, {
        type: { title: "page" },
        category: { title: "default" },
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
    }),
    "Failed to load pages."
  );

  return json({ user, pages }, { headers });
};

export default loader;
