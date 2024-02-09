import { LoaderFunctionArgs, json } from "@remix-run/node";
import { auth } from "~/services/auth/index.server";
import { prisma } from "~/services/prisma.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  const categories = await prisma.post.findMany({
    where: {
      type: "category",
      category: "post",
    },
    select: {
      id: true,
      title: true,
    },
    distinct: ["title"],
    orderBy: {
      title: "asc",
    },
  });

  return json({ id, categories }, { headers });
};
