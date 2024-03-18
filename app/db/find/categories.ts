import { Prisma } from "@prisma/client";
import prisma from "~/services/prisma.server";
import NotFoundError from "~/errors/notFoundError";

const categories = async <T extends Prisma.CategorySelect>(
  args: Prisma.CategoryFindManyArgs & { select: T }
) => {
  try {
    const response = await prisma.category.findMany<{ select: T }>(args);

    if (!response.length) throw new NotFoundError("No category list found");

    return { data: response, error: null };
  } catch (e: any) {
    process.env.NODE_ENV === "development" && console.error(e.message);
    if (e instanceof NotFoundError)
      return { data: null, error: { message: e.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};

export default categories;
