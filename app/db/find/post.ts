import { Prisma } from "@prisma/client";
import prisma from "~/services/prisma.server";
import NotFoundError from "~/errors/notFoundError";

const post = async <T extends Prisma.PostSelect>(
  args: Prisma.PostFindUniqueArgs & { select: T }
) => {
  try {
    const response = await prisma.post.findUnique<{
      where: Prisma.PostWhereUniqueInput;
      select: T;
    }>(args);

    if (!response) throw new NotFoundError("No Post list found");

    return { data: response, error: null };
  } catch (e: any) {
    process.env.NODE_ENV === "development" && console.error(e.message);
    if (e instanceof NotFoundError)
      return { data: null, error: { message: e.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};

export default post;
