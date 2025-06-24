/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);
const cookieName = "blood-line";

export async function encryptJWT(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24 hours from now")
    .sign(key);
}

export async function decryptJWT(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function getDecryptedJWT(session: string) {
  return await decryptJWT(session);
}

export async function setCookie(session: any) {
  // const session = await encryptJWT(sessionData);
  (
    await // const session = await encrypt(profile);
    cookies()
  ).set(cookieName, session, { httpOnly: true });
}

export async function getCookie() {
  const session = (await cookies()).get(cookieName)?.value;
  if (!session) return null;
  return await decryptJWT(session);
}

export async function getPlainCookie() {
  const session = (await cookies()).get(cookieName)?.value;
  if (!session) return null;
  return session;
}

export async function clearCookie() {
  // cookies().delete("mulchant", { httpOnly: true });
  (
    await // cookies().delete("mulchant", { httpOnly: true });
    cookies()
  ).set(cookieName, "", { expires: new Date(0) });
}
