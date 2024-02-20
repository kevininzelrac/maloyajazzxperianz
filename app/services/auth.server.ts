import jwt, { JwtPayload } from "jsonwebtoken";
import { userSession } from "./session.server";
import { Session, SessionData } from "@remix-run/node";
import prisma from "./prisma.server";

export type authType = {
  id?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  headers?: { "Set-Cookie": string };
};

export default async function auth(request: Request): Promise<authType> {
  const user = await userSession.getSession(request.headers.get("Cookie"));
  const accessToken = user.get("accessToken");

  if (!accessToken) return await destroy(user);

  const verifiedAccess = verify(
    accessToken,
    process.env.ACCESS_SECRET as string
  );

  if (!verifiedAccess) {
    const verifiedRefresh = verify(
      user.get("refreshToken"),
      process.env.REFRESH_SECRET as string
    );

    if (!verifiedRefresh) return await destroy(user);

    const matchToken = await getRefreshToken(
      verifiedRefresh.id,
      user.get("refreshToken")
    );

    if (!matchToken) return await destroy(user);

    const verifiedMatch: any = verify(
      matchToken,
      process.env.REFRESH_SECRET as string
    );

    if (!verifiedMatch) return await destroy(user);

    const { id, email, firstname, lastname, avatar } = verifiedMatch;

    const newAccessToken = jwt.sign(
      { id, email, firstname, avatar },
      process.env.ACCESS_SECRET as string,
      { expiresIn: process.env.ACCESS_TOKEN_DURATION }
    );

    user.set("accessToken", newAccessToken);

    return {
      id,
      email,
      firstname,
      lastname,
      avatar,
      headers: {
        "Set-Cookie": await userSession.commitSession(user),
      },
    };
  }

  const { id, email, firstname, lastname, avatar } = verifiedAccess;

  return {
    id: id,
    email,
    firstname,
    lastname,
    avatar,
    headers: undefined,
  };
}

const destroy = async (user: Session<SessionData, SessionData>) => {
  return {
    id: undefined,
    email: undefined,
    firstname: undefined,
    lastname: undefined,
    avatar: undefined,
    headers: {
      "Set-Cookie": await userSession.destroySession(user),
    },
  };
};

const verify = (token: string, secret: string): JwtPayload | null => {
  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch (error) {
    return null;
  }
};

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
