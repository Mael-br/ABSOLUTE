import { SignJWT, jwtVerify } from "jose";

import { getRequiredEnv } from "@/lib/env";

export const SESSION_COOKIE = "absolute_session";

export type SessionPayload = {
  sub: string;
  name: string;
  email: string;
};

function getJwtSecret() {
  return new TextEncoder().encode(getRequiredEnv("JWT_SECRET"));
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({
    name: payload.name,
    email: payload.email
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret());

  return {
    sub: payload.sub as string,
    name: payload.name as string,
    email: payload.email as string
  } satisfies SessionPayload;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
};

