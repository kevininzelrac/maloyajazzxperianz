import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";
import getToken from "./getToken";
import checkout from "./checkout";

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { firstname, lastname, email } = await auth(request);
  const formData = await request.formData();

  const { access_token } = await getToken();

  const response = await checkout({
    access_token: access_token,
    item: String(formData.get("item")),
    amount: Number(formData.get("amount")),
    firstname,
    lastname,
    email,
  });

  return redirect(response.redirectUrl);
};

export default action;
