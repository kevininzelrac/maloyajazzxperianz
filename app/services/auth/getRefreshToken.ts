import { prisma } from "../prisma.server";

export const getRefreshToken = async (
  userId: string,
  token: string
): Promise<string | null> => {
  const refresh = await prisma.refreshToken.findFirst({
    where: {
      userId: userId,
      token: token,
      revoked: false,
    },
  });
  if (!refresh) return null;

  return refresh!.token;
};
