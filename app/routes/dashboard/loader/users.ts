import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const users = async () => {
  await sleep(1000);
  return Promise.resolve().then(() =>
    prisma.user.findMany({
      //where: { OR: [{ role: "FOLLOWER" }, { role: "BASIC" }] },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    })
  );
};
export default users;
