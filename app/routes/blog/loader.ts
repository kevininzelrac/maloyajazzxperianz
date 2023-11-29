import { TypedDeferredData, defer } from "@remix-run/node";
import { prisma } from "~/services/prisma.server";

type Posts = {
  title: string;
  content: string;
  author: {
    firstname: string;
    lastname: string;
    avatar: string;
  };
}[];

const getPosts = async (): Promise<Posts> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  return prisma.post.findMany({
    select: {
      title: true,
      content: true,
      author: {
        select: {
          firstname: true,
          lastname: true,
          avatar: true,
        },
      },
    },
  });
};

export const config = { runtime: "edge" };

export const loader: () => Promise<
  TypedDeferredData<{ response: Promise<Posts> }>
> = async () => {
  return defer({ response: getPosts() });
};

//Workaround to make compatible prisma with * defer > Await > Suspense *
//const response = Promise.resolve().then(() => prisma.post.findMany());
//const response: Promise<(Post & { author: User })[]> = prisma.post
//  .findMany()
//  .then(async (x) => {
//    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
//    return x;
//  });
