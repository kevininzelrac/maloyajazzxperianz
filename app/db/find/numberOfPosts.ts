import prisma from "~/services/prisma.server";
import { Params } from "@remix-run/react";
import NotFoundError from "~/errors/notFoundError";

const numberOfPosts = async (params: Params) => {
  try {
    const response = await prisma.post.count({
      where: {
        type: {
          title: "post",
        },
        category: { title: params.category ? params.category : {} },
      },
    });
    if (!response) throw new NotFoundError("No posts found");

    return { data: response, error: null };
  } catch (e: any) {
    process.env.NODE_ENV === "development" && console.error(e.message);
    if (e instanceof NotFoundError)
      return { data: null, error: { message: e.message } };
    return { data: null, error: { message: "internal server error" } };
  }
};
export default numberOfPosts;
