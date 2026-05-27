"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userMe } from "@/lib/api/services/user.service";
export default function VerifyWatcher() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data, response } = await userMe();

      if (!response.ok) return;

      if (data?.is_verified) {
        clearInterval(interval);
        router.push("/dashboard");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  return null;
}
