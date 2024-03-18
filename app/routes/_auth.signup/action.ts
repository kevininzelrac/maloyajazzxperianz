import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import bcrypt from "bcryptjs";
import { newUserSession } from "~/services/session.server";
//import mail from "./mail";

const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const newUser = await newUserSession.getSession(
    request.headers.get("Cookie")
  );

  const code = verificationCode();

  newUser.set("newUser", {
    firstname: String(formData.get("firstname")),
    lastname: String(formData.get("lastname")),
    email: String(formData.get("email")),
    code: await bcrypt.hash(code, 10),
    passwordHash: await bcrypt.hash(String(formData.get("password")), 10),
  });

  try {
    //const sesClient = new SESClient({
    //  region: process.env.region,
    //});
    //await sesClient.send(new SendEmailCommand(mail(email, code)));
    return redirect("confirm", {
      headers: {
        "Set-Cookie": await newUserSession.commitSession(newUser),
      },
    });
  } catch (error) {
    console.error("Failed to send email : ", error);
    return json({
      success: false,
      error,
    });
  }
};

function verificationCode() {
  //if (process.env.NODE_ENV === "production") {
  //  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  //  return code.toString();
  //} else {
  //  return "0000";
  //}
  return "0000";
}
export default action;

function validateEmail(email: string | undefined): boolean {
  if (undefined === email) {
    return false;
  }
  // eslint-disable-next-line no-useless-escape
  const mailformat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(mailformat) ? true : false;
}
