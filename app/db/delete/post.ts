import { Prisma } from "@prisma/client";
import prisma from "~/services/prisma.server";
import NotFoundError from "~/errors/notFoundError";

const post = async <T extends Prisma.PostSelect>(
  args: Prisma.PostDeleteArgs & {
    select: T;
  }
) => {
  try {
    const response = await prisma.post.delete<{
      where: Prisma.PostWhereUniqueInput;
      select: T;
    }>(args);
    if (!response) throw new NotFoundError("error during Post deletion");
    return { data: response, error: null };
  } catch (e: any) {
    console.error(e);
    if (e instanceof NotFoundError)
      return { data: null, error: { message: e.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};
export default post;
