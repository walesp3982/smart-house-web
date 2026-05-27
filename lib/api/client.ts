import "server-only";

import createClient, { Middleware } from "openapi-fetch";
import { paths } from "./types";
import { cookies } from "next/headers";
export const apiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
});

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }

    return request;
  },

  async onResponse({ response }) {
    return response;
  },
};

apiClient.use(authMiddleware);
