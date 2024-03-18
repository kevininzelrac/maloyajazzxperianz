import { Prisma } from "@prisma/client";
import prisma from "~/services/prisma.server";
import NotFoundError from "~/errors/notFoundError";

const post = async <T extends Prisma.PostSelect>(
  args: Prisma.PostCreateArgs & {
    data: Prisma.PostCreateInput;
    select: T;
  }
) => {
  try {
    const response = await prisma.post.create<{
      data: Prisma.PostCreateInput;
      select: T;
    }>(args);
    if (!response) throw new NotFoundError("error during Post creation");
    return { data: response, error: null };
  } catch (error: any) {
    console.error(error.message);
    if (error instanceof NotFoundError)
      return { data: null, error: { message: error.message } };
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return {
        data: null,
        error: { message: "Post title already exists" },
      };
    //
    return { data: null, error: { message: "internal server error" } };
  }
};
export default post;
