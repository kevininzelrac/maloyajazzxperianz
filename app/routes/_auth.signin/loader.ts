import { LoaderFunction, json } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return json({ clientId: process.env.GOOGLE_CLIENT_ID });
};
