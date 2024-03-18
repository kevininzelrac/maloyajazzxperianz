import { json } from "@remix-run/node";
import db from "~/db";

const loader = async () => {
  return json({
    types: await db.find.types({
      select: {
        id: true,
        title: true,
      },
    }),
  });
};

export default loader;
