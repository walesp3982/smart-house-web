import { apiClient } from "@/lib/api/client";

export async function userMe() {
  return await apiClient.GET("/users/me", {});
}
