import { getAllHousesWithArea } from "@/lib/api/services";

export async function getAllHousesUser() {
    const { data, error } = await getAllHousesWithArea()
    if (!data) return null
    if (error) return null
    return data
}