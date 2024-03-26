import { Role } from "@prisma/client";
import { Params } from "@remix-run/react";
import withPriviledges from "~/middlewares/withPriviledge";
import prisma from "~/services/prisma.server";

const posts = async (
  request: Request,
  params: Params,
  user: { id: string; role: Role } | null
) => {
  let author = new URL(request.url).searchParams.get("author");

  return prisma.post
    .findMany({
      where: withPriviledges(user, {
        //id: "te",
        typeTitle: "post",
        category: params.category ? { title: params.category } : {},
        author: author ? { firstname: author } : {},
      }),
      //take: take,
      //skip: take * skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        audience: true,
        createdAt: true,
        type: {
          select: {
            title: true,
          },
        },
        category: {
          select: {
            title: true,
          },
        },
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            avatar: true,
            role: true,
          },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
    })
    .then((posts) => posts);
};
export default posts;
