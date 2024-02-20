import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  if (!id)
    return redirect("/signin", {
      headers,
    });

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      avatar: true,
      role: true,
    },
  });
  if (!user) {
    throw json(null, {
      status: 404,
      statusText: "User Not Found",
    });
  }

  if (id !== user!.id)
    throw json(null, {
      status: 403,
      statusText: "Forbidden",
    });

  await sleep;
  return json({ user }, { headers });
};
export default loader;
