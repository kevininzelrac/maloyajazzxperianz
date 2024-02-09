import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { auth } from "~/services/auth/index.server";
import { prisma } from "~/services/prisma.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id)
    return redirect("/signin", {
      headers,
    });

  const page = await prisma.post.findFirst({
    where: {
      title: params.page,
    },
  });

  const categories = await prisma.post.findMany({
    select: {
      category: true,
      type: true,
    },
    distinct: ["category"],
    orderBy: {
      category: "asc",
    },
  });

  const defaults = [
    { category: "page", type: "category" },
    { category: "post", type: "category" },
  ];

  defaults.forEach((item) => {
    if (!categories.some(({ category }) => category === item.category)) {
      categories.push(item);
    }
  });

  if (!page)
    throw json(null, {
      status: 404,
      statusText: "Not Found",
    });

  if (id !== page?.authorId)
    throw json(null, {
      status: 403,
      statusText: "Forbidden",
    });

  return json({ id, page, categories }, { headers });
};
