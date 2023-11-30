import { prisma } from "~/services/prisma.server";

export const putRefreshToken = async (
  userId: string,
  token: string
): Promise<string | null> => {
  const existingRefreshToken = await prisma.refreshToken.findFirst({
    where: {
      userId: userId,
      revoked: false,
    },
  });

  if (existingRefreshToken) {
    return existingRefreshToken.token;
  } else {
    const newRefreshToken = await prisma.refreshToken.create({
      data: {
        userId: userId,
        token: token,
        revoked: false,
      },
    });

    return newRefreshToken.token;
  }
};
