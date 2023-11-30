import { prisma } from "~/services/prisma.server";

export const putNewUser = async (
  firstname: string,
  lastname: string,
  email: string,
  passwordHash: string
): Promise<{ email: String; passwordHash: string } | null> => {
  await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      fullName: firstname + " " + lastname,
      firstname: firstname,
      lastname: lastname,
      avatar: "https://picsum.photos/50",
      Credential: {
        create: {
          passwordHash: passwordHash,
        },
      },
    },
  });
  return {
    email,
    passwordHash,
  };
};
