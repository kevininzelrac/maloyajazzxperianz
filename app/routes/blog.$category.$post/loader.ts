import { LoaderFunctionArgs, json } from "@remix-run/node";
import prisma from "~/services/prisma.server";
import auth from "~/services/auth.server";
import sleep from "~/utils/sleep";
import withPriviledges from "~/middlewares/withPriviledge";

const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          role: true,
        },
      })
    : undefined;
  //const where = {
  //  type: "post",
  //  category: params.category,
  //  title: params.post,
  //};
  const post = await prisma.post.findFirst({
    where: withPriviledges(user, {
      type: "post",
      category: params.category,
      title: params.post,
    }),
    select: {
      id: true,
      type: true,
      title: true,
      content: true,
      category: true,
      createdAt: true,
      status: true,
      authorId: true,
      author: {
        select: {
          firstname: true,
          lastname: true,
          avatar: true,
        },
      },
    },
  });

  if (!post) {
    throw json(null, {
      status: 404,
      statusText: "Post Not Found",
    });
  }

  await sleep;
  return json({ user, post }, { headers });
};
export default loader;
