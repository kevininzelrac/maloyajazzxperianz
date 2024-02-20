import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";
import getToken from "./getToken";
import checkout from "./checkout";

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { firstname, lastname, email } = await auth(request);
  const formData = await request.formData();
  const item = formData.get("item") as string;
  const amount = formData.get("amount") as string;

  const { access_token } = await getToken();
  //console.log(access_token);

  const response = await checkout({
    access_token: access_token,
    item,
    amount: parseInt(amount),
    firstname,
    lastname,
    email,
  });
  //console.log(response);

  //return json({ response });
  return redirect(response.redirectUrl);
  //return null;
};

export default action;
