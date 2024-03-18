import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";
import db from "~/db";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) throw redirect("/");

  return json(
    {
      user: { id },
      types: await db.find.types({
        distinct: ["title"],
        select: {
          id: true,
          title: true,
          categories: {
            orderBy: {
              title: "asc",
            },
            select: {
              id: true,
              title: true,
              posts: {
                orderBy: {
                  createdAt: "desc",
                },
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      }),
    },
    { headers }
  );
};
export default loader;
