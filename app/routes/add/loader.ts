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

  return json({ id, categories });
};
