import { ActionFunction, ActionFunctionArgs, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";
import { userSession } from "~/services/session.server";
import revokeRefreshToken from "./revokeRefreshToken";

export const loader: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const user = await userSession.getSession(request.headers.get("Cookie"));
  const { id } = await auth(request);

  await revokeRefreshToken(id!, user.get("refreshToken"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await userSession.destroySession(user),
    },
  });
};
