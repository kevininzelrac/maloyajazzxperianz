import { json } from "@remix-run/node";
import { prisma } from "~/services/prisma.server";

export const loader = async () => {
  const categories = await prisma.post.findMany({
    where: {
      type: "post",
    },
    select: {
      category: true,
      type: true,
    },
    distinct: ["category"],
    orderBy: {
      category: "asc",
    },
  });
  return json({ categories });
};
