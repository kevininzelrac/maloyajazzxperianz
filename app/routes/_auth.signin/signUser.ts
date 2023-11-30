import { prisma } from "~/services/prisma.server";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const signUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
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
