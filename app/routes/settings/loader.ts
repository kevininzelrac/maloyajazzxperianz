import { LoaderFunctionArgs, json } from "@remix-run/node";
import db from "~/db";
import auth from "~/services/auth.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  return json(
    {
      user: await db.find.user({
        where: { id },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          role: true,
          avatar: true,
        },
      }),
    },
    { headers }
  );
};
export default loader;
