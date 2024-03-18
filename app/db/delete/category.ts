import { Prisma } from "@prisma/client";
import prisma from "~/services/prisma.server";
import NotFoundError from "~/errors/notFoundError";

const category2 = async <T extends Prisma.CategorySelect>(
  args: Prisma.CategoryDeleteArgs & {
    select: T;
  }
) => {
  try {
    const response = await prisma.category.delete<{
      where: Prisma.CategoryWhereUniqueInput;
      select: T;
    }>(args);
    if (!response) throw new NotFoundError("error during Category deletion");
    return { data: response, error: null };
  } catch (e: any) {
    console.error(e);
    if (e instanceof NotFoundError)
      return { data: null, error: { message: e.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};
export default category2;
