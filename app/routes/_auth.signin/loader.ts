import { LoaderFunction, json } from "@remix-run/node";

const loader: LoaderFunction = () => {
  return json({ client_id: process.env.GOOGLE_CLIENT_ID });
};
export default loader;
