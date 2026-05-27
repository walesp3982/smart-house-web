"use server";
import { apiClient } from "@/lib/api/client";

export async function loginUser(email: string, password: string) {
  const { data, error, response } = await apiClient.POST("/token", {
    body: { username: email, password: password, scope: "" },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return { data, error, ok: response.ok, status: response.status }
}

export async function registerUser(
  email: string,
  name: string,
  password: string,
) {
  const { data, error, response } = await apiClient.POST("/users/register", {
    body: {
      email: email,
      name: name,
      password: password,
    },
  });

  return {
    data,
    error,
    ok: response.ok,
    status: response.status,
  }
}
