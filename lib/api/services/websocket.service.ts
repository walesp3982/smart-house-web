import { apiClient } from "../client";
import { components } from "@/lib/api/types"

export type TicketResponse = components["schemas"]["TicketSocket"]
export async function getTicketSocket() {
    const { data, error, response } = await apiClient.POST("/auth/ws-ticket")

    return { data, error, ok: response.ok, status: response.status }
}