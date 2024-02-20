import { ActionFunction, ActionFunctionArgs, json } from "@remix-run/node";
import gmail from "~/services/gmail.server";
import createAssessment from "~/services/reCaptcha.server";

const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const from = formData.get("from") as string;
  //const subject = formData.get("subject") as string;
  const text = formData.get("text") as string;
  const token = formData.get("token") as string;
  const action = formData.get("action") as string;

  await createAssessment({ token, action });

  const response = await gmail.sendMail({
    from: '"ShedSync - Band Manager" <shedsync@gmail.com>',
    to: "shedsync@gmail.com",
    //subject: subject,
    subject: "MJX • Contact Form • Message from " + from,
    html: "<h4>" + from + "</h4>" + "<p>" + text + "</p>",
    //text: text,
  });

  return json({ response });
};
export default action;
