import { Role } from "@prisma/client";
import withPriviledges from "~/middlewares/withPriviledge";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const categories = async (user: { id: string; role: Role } | null) =>
  await withTryCatch(
    prisma.category.findMany({
      //where: { id: "te" },
      where: {
        type: { title: "post" },
        //posts: { every: withPriviledges(user, { typeTitle: "post" }) },
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            posts: {
              where: withPriviledges(user, {}),
            },
          },
        },
      },
    })
  );

export default categories;
