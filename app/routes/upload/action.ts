import { ActionFunction, ActionFunctionArgs, json } from "@remix-run/node";
import { put } from "@vercel/blob";

export const config = { runtime: "edge" };

const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const file = form.get("file") as File;
  const { url } = await put(file.name, file, { access: "public" });

  if (!url) {
    throw json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  return json({ url });
};
export default action;
