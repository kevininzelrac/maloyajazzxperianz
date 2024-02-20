import prisma from "~/services/prisma.server";
import bcrypt from "bcryptjs";

const signUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      avatar: true,
    },
  });

  if (!user) throw new Error("Incorrect email or password.");

  const credential = await prisma.credential.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      passwordHash: true,
    },
  });

  if (!credential) throw new Error("Credential not found for user.");

  const match = bcrypt.compare(password, credential.passwordHash!);

  if (!match) throw new Error("Incorrect email or password.");

  return user;
};

export default signUser;
