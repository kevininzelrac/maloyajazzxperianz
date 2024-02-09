import { LoaderFunctionArgs, json } from "@remix-run/node";
import { prisma } from "~/services/prisma.server";
import { auth } from "~/services/auth/index.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const page = await prisma.post.findFirst({
    where: {
      title: params.page,
      type: id ? {} : "page",
    },
  });

  if (!page) {
    throw json(null, {
      status: 404,
      statusText: "Page Not Found",
    });
  }

  return json({ page, id }, { headers });
};
