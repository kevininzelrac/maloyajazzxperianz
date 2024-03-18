import { Prisma } from "@prisma/client";
import prisma from "~/services/prisma.server";
import NotFoundError from "~/errors/notFoundError";

const post = async <T extends Prisma.PostSelect>(
  args: Prisma.PostUpdateArgs & {
    select: T;
  }
) => {
  try {
    const response = await prisma.post.update<{
      where: Prisma.PostWhereUniqueInput;
      data: Prisma.PostUpdateInput;
      select: T;
    }>(args);
    if (!response) throw new NotFoundError("error during post creation");
    return { data: response, error: null };
  } catch (error: any) {
    console.error(error.message);
    if (error instanceof NotFoundError)
      return { data: null, error: { message: error.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};
export default post;
