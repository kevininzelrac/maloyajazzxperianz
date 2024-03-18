import { LoaderFunctionArgs, json } from "@remix-run/node";
import auth from "~/services/auth.server";
import db from "~/db";

const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await db.find.user({
        where: { id },
        select: { id: true, role: true },
      })
    : null;

  const page = await db.find.post({
    where: {
      typeTitle: "page",
      categoryTitle: "default",
      title: params.page!,
    },
    select: {
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
    },
  });

  return json({ user, page }, { headers });
};
export default loader;
