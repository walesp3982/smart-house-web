import { getInstalledDevicesWithDevice } from "@/lib/api/services";

export async function getInstalledDevicesUser() {
    const { data, error } = await getInstalledDevicesWithDevice()

    if (error) return null
    return data
}