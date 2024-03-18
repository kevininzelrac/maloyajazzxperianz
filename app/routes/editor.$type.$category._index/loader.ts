import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/db";
import withPriviledges from "~/middlewares/withPriviledge";
import auth from "~/services/auth.server";

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) throw redirect("/");
  const user = await db.find.user({
    where: { id },
    select: { id: true, role: true },
  });
  return json(
    {
      user,
      posts: await db.find.posts({
        where: withPriviledges(user.data, {
          type: { title: params.type },
          category: { title: params.category },
        }),
        select: {
          id: true,
          title: true,
          author: { select: { id: true, firstname: true } },
        },
      }),
    },
    { headers }
  );
};
export default loader;
