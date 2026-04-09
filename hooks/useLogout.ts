"use client";

import { deleteTokenCookie } from "@/actions/auth";
import { useRouter } from "next/router";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    await deleteTokenCookie();
    router.push("/login");
  };

  return { logout };
}
