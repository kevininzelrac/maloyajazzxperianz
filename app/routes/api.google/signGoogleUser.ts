import { User } from "@prisma/client";
import prisma from "~/services/prisma.server";

const signGoogleUser = async (
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  avatar: string
): Promise<User | null> => {
  const user = await prisma.user.upsert({
    where: { email: email },
    update: { avatar: avatar },
    create: {
      email: email,
      fullName: firstname + " " + lastname,
      firstname: firstname,
      lastname: lastname,
      avatar: avatar,
    },
  });

  return user;
};
export default signGoogleUser;
