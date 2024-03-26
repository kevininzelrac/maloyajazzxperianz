import { LoaderFunctionArgs, defer, redirect } from "@remix-run/node";
import posts from "./posts";
import users from "./users";
import comments from "./comments";
import likes from "./likes";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) throw redirect("/signin");

  const user = await prisma.user.findUnique({
    //where: { id, OR: [{ role: "ADMIN" }, { role: "EDITOR" }] },
    where: { id, NOT: { role: "FOLLOWER" } },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      avatar: true,
      role: true,
    },
  });
  if (!user) throw redirect("/signin");

  return defer(
    {
      user,
      posts: posts(user),
      users: user.role === "ADMIN" ? users() : Promise.resolve(),
      comments: comments(user),
      likes: likes(),
    },
    { headers }
  );
};
export default loader;
