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

  const page = await prisma.post.findUnique({
    where: {
      typeTitle: "page",
      categoryTitle: "default",
      title: params.page,
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
  if (!page) throw json(null, { status: 404, statusText: "Page Not Found" });

  return json({ user, page }, { headers });
};
export default loader;
