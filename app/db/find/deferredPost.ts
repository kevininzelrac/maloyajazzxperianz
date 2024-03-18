import { Prisma } from "@prisma/client";
import prisma from "~/services/prisma.server";

const deferredPosts = async <T extends Prisma.PostSelect>(
  args: Prisma.PostFindManyArgs & { select: T }
) => {
  return prisma.post.findMany<{ select: T }>(args).then((posts) => {
    if (!posts || !posts.length) throw new Error("error fetching posts...");
    return posts;
  });
};

export default deferredPosts;
