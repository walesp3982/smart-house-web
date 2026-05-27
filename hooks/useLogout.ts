"use client";

import { deleteTokenCookie } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    await deleteTokenCookie();
    router.push("/");
  };

  return { logout };
}
