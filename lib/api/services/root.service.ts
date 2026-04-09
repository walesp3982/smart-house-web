"use server";

import { apiClient } from "@/lib/api/client";

export async function getRoot() {
  return await apiClient.GET("/", {});
}
