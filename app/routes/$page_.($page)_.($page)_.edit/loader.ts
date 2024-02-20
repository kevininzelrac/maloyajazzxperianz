import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id)
    return redirect("/signin", {
      headers,
    });

  const isBlog = new URL(request.url).pathname.includes("blog");

  const page = await prisma.post.findFirst({
    where: {
      type: isBlog ? "post" : "page",
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
    { type: "category", category: "page" },
    { type: "category", category: "post" },
  ];

  defaults.forEach((item) => {
    if (
      !categories.some(
        ({ type, category }) => type === item.type && category === item.category
      )
    ) {
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

  await sleep;
  return json({ id, page, categories }, { headers });
};
export default loader;
