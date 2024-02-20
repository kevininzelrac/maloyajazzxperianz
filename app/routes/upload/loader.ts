import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

export const config = { runtime: "edge" };

import auth from "~/services/auth.server";

const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  await auth(request);
  return null;
};
export default loader;
