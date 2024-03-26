import { Role, User } from "@prisma/client";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const comments = async (user: { id: User["id"]; role: Role }) => {
  await sleep(1500);
  return Promise.resolve().then(() =>
    prisma.comment.findMany({
      where:
        user.role !== "ADMIN"
          ? {
              author: { id: user.id },
            }
          : {},
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        createdAt: true,
        content: true,
        author: {
          select: { id: true, firstname: true, lastname: true, avatar: true },
        },
        post: {
          select: {
            id: true,
            title: true,
            category: { select: { title: true } },
          },
        },
      },
    })
  );
};
export default comments;
