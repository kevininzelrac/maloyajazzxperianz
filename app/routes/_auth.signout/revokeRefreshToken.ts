import prisma from "~/services/prisma.server";

const revokeRefreshToken = async (
  userId: string,
  token: string
): Promise<void> => {
  await prisma.refreshToken.update({
    where: {
      userId: userId,
      token: token,
    },
    data: {
      revoked: true,
    },
  });
};
export default revokeRefreshToken;
