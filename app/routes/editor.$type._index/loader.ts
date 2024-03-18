import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/db";
import auth from "~/services/auth.server";

//const select = { id: true, title: true } satisfies Prisma.CategorySelect;
//export type catsType = Awaited<Prisma.CategoryGetPayload<{select: typeof select}>>;

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) return redirect("/");

  const user = await db.find.user({
    where: { id },
    select: { id: true, role: true },
  });
  if (user.error) return redirect("/");

  return json(
    {
      user,
      categories: await db.find.categories({
        where: { type: { title: params.type } },
        select: { id: true, title: true },
      }),
    },
    { headers }
  );
};
export default loader;
