import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "./services/auth.server";
import withTryCatch from "./middlewares/withTryCatch";
import prisma from "./services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const { id } = await auth(request);
  const formData = await request.formData();

  if (request.method === "POST") {
    const page = await withTryCatch(
      prisma.post.create({
        data: {
          type: { connect: { title: "page" } },
          category: { connect: { title: "default" } },
          author: { connect: { id } },
          title: String(formData.get("title")),
          content: "enter content here",
        },
        select: { id: true, title: true },
      }),
      "Failed to create page"
    );
    if (page.error) return json(page, { status: 500 });
    return redirect(`/${page.data.title}`);
  }
};

export default action;
