import { LoaderFunction, json } from "@remix-run/node";
import sleep from "~/utils/sleep";

const loader: LoaderFunction = async () => {
  await sleep;
  return json({ siteKey: process.env.RECAPTCHA_SITE_KEY });
};
export default loader;
