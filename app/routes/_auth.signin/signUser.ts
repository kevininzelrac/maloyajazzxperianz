import prisma from "~/services/prisma.server";
import bcrypt from "bcryptjs";

const signUser = async (
  email: string,
  password: string
): Promise<{
  user?: typeof user;
  error?: string;
}> => {
  const user = await prisma.user
    .findUnique({
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
    })
    .catch((error) => {
      console.error(error);
    });

  if (!user) return { error: "User not found." };

  const credential = await prisma.credential
    .findUnique({
      where: {
        userId: user.id,
      },
      select: {
        passwordHash: true,
      },
    })
    .catch((error) => {
      console.error(error);
    });

  if (!credential) return { error: "Credential not found for user." };

  const match = await bcrypt
    .compare(password, credential.passwordHash!)
    .catch((error) => {
      console.error(error);
    });

  if (!match) return { error: "Incorrect email or password." };

  return { user };
};

export default signUser;
