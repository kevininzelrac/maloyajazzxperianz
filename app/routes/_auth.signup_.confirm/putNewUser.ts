import prisma from "~/services/prisma.server";

const putNewUser = async (
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
      fullname: firstname + " " + lastname,
      firstname: firstname,
      lastname: lastname,
      avatar: "https://picsum.photos/50",
      credential: {
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
export default putNewUser;
