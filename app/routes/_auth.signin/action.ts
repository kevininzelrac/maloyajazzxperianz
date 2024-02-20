import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { userSession } from "~/services/session.server";
import signUser from "./signUser";
import putRefreshToken from "./putRefreshToken";
import jwt from "jsonwebtoken";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const user = await signUser(email, password);

    const newUser = {
      id: user?.id,
      email: user?.email,
      firstname: user?.firstname,
      lastname: user?.lastname,
      avatar: user?.avatar,
    };

    const refreshToken = jwt.sign(newUser, process.env.REFRESH_SECRET);

    const verifiedRefresh = await putRefreshToken(user?.id!, refreshToken);

    const accessToken = jwt.sign(newUser, process.env.ACCESS_SECRET, {
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
  } catch (error) {
    console.error(error);
    return json({
      error: "Wooops Something Weird just happened !",
    });
  }
};
export default action;
