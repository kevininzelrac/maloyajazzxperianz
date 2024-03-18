import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/db";
import auth from "~/services/auth.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) return redirect("/");
  const user = await db.find.user({
    where: {
      id,
      OR: [{ role: "ADMIN" }, { role: "EDITOR" }],
    },
    select: { id: true, role: true },
  });
  if (user.error) return redirect("/");

  return json(null, { headers });
};
export default loader;
