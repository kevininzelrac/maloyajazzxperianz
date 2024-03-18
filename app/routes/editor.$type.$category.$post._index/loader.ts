import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/db";
import auth from "~/services/auth.server";

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) return redirect("/");

  const user = await db.find.user({
    where: { id },
    select: { id: true, role: true },
  });
  if (user.error) return redirect("/");

  const post = await db.find.post({
    where: {
      typeTitle: params.type,
      categoryTitle: params.category,
      title: params.post,
    },
    select,
  });
  if (post?.data?.author.id !== id)
    return redirect(
      params?.type === "post"
        ? "/blog/" + params.category + "/" + params.post
        : "/" + params.post
    );

  return json({ user, post }, { headers });
};

export default loader;

const select = {
  id: true,
  title: true,
  content: true,
  status: true,
  audience: true,
  createdAt: true,
  type: {
    select: {
      title: true,
    },
  },
  category: {
    select: {
      title: true,
    },
  },
  author: {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      avatar: true,
    },
  },
};
