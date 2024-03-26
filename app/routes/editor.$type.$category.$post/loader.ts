import { LoaderFunctionArgs, json } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) throw json(null, { status: 401, statusText: "Unauthorized" });

  const user = await prisma.user
    .findUnique({
      where: { id },
      select: { id: true, role: true },
    })
    .catch(() => null);
  if (!user) throw json(null, { status: 401, statusText: "Unauthorized" });

  const post = await prisma.post
    .findUnique({
      where: {
        typeTitle: params.type,
        categoryTitle: params.category,
        title: params.post,
        authorId: id,
      },
      select: postSelect,
    })
    .catch(() => null);
  if (!post) throw json(null, { status: 401, statusText: "Unauthorized" });

  return json({ user, post }, { headers });
};

export default loader;

const postSelect = {
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
};
