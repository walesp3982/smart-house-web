import { apiClient } from "@/lib/api/client";

export async function loginUser(email: string, password: string) {
  return await apiClient.POST("/token", {
    body: { username: email, password: password, scope: "" },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}
