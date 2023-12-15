import { LoaderFunctionArgs, json } from "@remix-run/node";
import { prisma } from "~/services/prisma.server";
import { auth } from "~/services/auth/index.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const post = await prisma.post.findFirst({
    where: {
      type: "post",
      category: params.category,
      title: params.post,
    },
  });
  return json({ post, id }, { headers });
};
