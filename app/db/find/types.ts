import prisma from "~/services/prisma.server";
import { Prisma } from "@prisma/client";
import NotFoundError from "~/errors/notFoundError";

const types = async <T extends Prisma.TypeSelect>(
  args: Prisma.TypeFindManyArgs & { select: T }
) => {
  try {
    const response = await prisma.type.findMany<{ select: T }>(args);

    if (!response.length) throw new NotFoundError("No Type list found");

    return { data: response, error: null };
  } catch (e: any) {
    process.env.NODE_ENV === "development" && console.error(e.message);
    if (e instanceof NotFoundError)
      return { data: null, error: { message: e.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};

export default types;
