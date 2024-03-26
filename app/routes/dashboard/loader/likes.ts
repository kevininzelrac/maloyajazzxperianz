import NotFoundError from "~/errors/notFoundError";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const likes = async () => {
  await sleep(2000);
  return Promise.resolve().then(() =>
    prisma.like.findMany({
      //where: { id: "te" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        author: { select: { firstname: true } },
        createdAt: true,
        post: {
          select: {
            title: true,
            author: { select: { firstname: true } },
          },
        },
        comment: {
          select: {
            content: true,
            author: { select: { firstname: true } },
          },
        },
      },
    })
  );
};
export default likes;
