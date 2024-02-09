import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { auth } from "~/services/auth/index.server";
import { prisma } from "~/services/prisma.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id)
    return redirect("/signin", {
      headers,
    });

  const categories = await prisma.post.findMany({
    where: {
      type: "category",
    },
    select: {
      category: true,
      title: true,
    },
    distinct: ["title"],
    orderBy: {
      title: "asc",
    },
  });

  const defaults = [
    { category: "category", title: "post" },
    { category: "category", title: "page" },
    { category: "page", title: "page" },
  ];

  defaults.forEach((item) => {
    if (
      !categories.some(
        ({ title, category }) =>
          title === item.title && category === item.category
      )
    ) {
      categories.push(item);
    }
  });

  return json({ id, categories });
};
