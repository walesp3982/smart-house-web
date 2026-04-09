"use server";

import { apiClient } from "@/lib/api/client";

export async function userMe() {
  return await apiClient.GET("/users/me", {});
}

export async function userVerified(user_id: number) {
  return await apiClient.GET("/users/verified/{user_id}", {
    params: { path: { user_id: user_id } },
  });
}

export async function confirmEmail(token: string) {
  return await apiClient.GET("/users/email-verification/{token}", {
    params: {
      path: { token },
    },
  });
}
