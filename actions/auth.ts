"use server";
import { cookies } from "next/headers";

export async function saveTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function deleteTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}
