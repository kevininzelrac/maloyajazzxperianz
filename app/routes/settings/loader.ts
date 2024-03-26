import { LoaderFunctionArgs, json } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) throw json(null, { status: 401, statusText: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstname: true,
      lastname: true,
      role: true,
      avatar: true,
    },
  });
  if (!user) throw json(null, { status: 404, statusText: "Not Found" });

  return json({ user }, { headers });
};
export default loader;

// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import withTryCatch from "~/middlewares/withTryCatch";
// import auth from "~/services/auth.server";
// import prisma from "~/services/prisma.server";

// const loader = async ({ request }: LoaderFunctionArgs) => {
//   const { id, headers } = await auth(request);
//   if (!id) throw json(null, { status: 401, statusText: "Unauthorized" });

//   const user = await withTryCatch(
//     prisma.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         email: true,
//         firstname: true,
//         lastname: true,
//         role: true,
//         avatar: true,
//       },
//     }),
//     "Failed to load user"
//   );
//   if (user.error)
//     throw json(user, { status: 500, statusText: "Internal Server Error" });
//   if (!user.data) throw json(null, { status: 401, statusText: "Unauthorized" });

//   return json({ user: user.data }, { headers });
// };
// export default loader;
