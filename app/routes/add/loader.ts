import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id)
    return redirect("/signin", {
      headers,
    });

  const user = await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });
  if (["BASIC", "FOLLOWER", undefined, null].includes(user?.role)) {
    throw json(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  const categories = await prisma.post.findMany({
    where: {
      type: "category",
      //OR: [{ type: "page" }, { type: "category" }],
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

  await sleep;
  return json({ id, categories });
};
export default loader;
