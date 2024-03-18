import { Prisma } from "@prisma/client";
import prisma from "~/services/prisma.server";
import NotFoundError from "~/errors/notFoundError";

const category = async <T extends Prisma.CategorySelect>(
  args: Prisma.CategoryCreateArgs & {
    select: T;
  }
) => {
  try {
    const response = await prisma.category.create<{
      data: Prisma.CategoryCreateInput;
      select: T;
    }>(args);
    if (!response) throw new NotFoundError("error during Category creation");
    return { data: response, error: null };
  } catch (error: any) {
    console.error(error.message);
    if (error instanceof NotFoundError)
      return { data: null, error: { message: error.message } };
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return {
        data: null,
        error: { message: "Category title already exists" },
      };
    //
    return { data: null, error: { message: "internal server error" } };
  }
};
export default category;
