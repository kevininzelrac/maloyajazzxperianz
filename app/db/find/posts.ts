import prisma from "~/services/prisma.server";
import { Prisma } from "@prisma/client";
import NotFoundError from "~/errors/notFoundError";

const posts = async <T extends Prisma.PostSelect>(
  args: Prisma.PostFindManyArgs & { select: T }
) => {
  try {
    const response = await prisma.post.findMany<{ select: T }>(args);

    if (!response.length) throw new NotFoundError("No Post list found");

    return { data: response, error: null };
  } catch (e: any) {
    process.env.NODE_ENV === "development" && console.error(e.message);
    if (e instanceof NotFoundError)
      return { data: null, error: { message: e.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};

export default posts;
