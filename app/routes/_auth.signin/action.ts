import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { userSession } from "~/services/session.server";
import signUser from "./signUser";
import putRefreshToken from "./putRefreshToken";
import jwt from "jsonwebtoken";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const { user } = await signUser(email, password);
  if (!user) return json({ error: "Incorrect email or password." });

  const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET);

  const verifiedRefresh = await putRefreshToken(user.id!, refreshToken);

  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_DURATION,
  });

  const _user = await userSession.getSession(request.headers.get("Cookie"));
  _user.set("refreshToken", verifiedRefresh);
  _user.set("accessToken", accessToken);

  return redirect("/", {
    headers: {
      "Set-Cookie": await userSession.commitSession(_user),
    },
  });
};
export default action;
