import { Role, User } from "@prisma/client";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const posts = async (user: { id: User["id"]; role: Role }) => {
  await sleep(500);
  return Promise.resolve().then(() =>
    prisma.post.findMany({
      where:
        user.role === "ADMIN"
          ? {}
          : {
              author: { id: user.id },
            },
      //where: { status: "DRAFT", type: { title: "pag" } },
      //where: { id: "te" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        type: { select: { title: true } },
        category: { select: { title: true } },
        status: true,
        audience: true,
        createdAt: true,
        author: {
          select: { id: true, firstname: true, lastname: true, avatar: true },
        },
      },
    })
  );
};
export default posts;
