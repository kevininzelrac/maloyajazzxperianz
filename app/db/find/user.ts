import prisma from "~/services/prisma.server";
import { Prisma } from "@prisma/client";
import NotFoundError from "~/errors/notFoundError";

const user = async <T extends Prisma.UserSelect>(
  args: Prisma.UserFindUniqueArgs & { select: T }
) => {
  try {
    const response = await prisma.user.findUnique<{
      where: Prisma.UserWhereUniqueInput;
      select: T;
    }>(args);

    if (!response) throw new NotFoundError("No User list found");

    return { data: response, error: null };
  } catch (e: any) {
    process.env.NODE_ENV === "development" && console.error(e.message);
    if (e instanceof NotFoundError)
      return { data: null, error: { message: e.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};

export default user;
