"use server"

import { userMe } from "@/lib/api/services"

export async function getUserMe() {
    const { data, error } = await userMe()
    if (error) return null
    return data
}

