"use client"
import { useUserStore } from "@/store/user-store"
import { useHouseStore } from "@/store/house-store"
import { useInstalledDevicesStore } from "@/store/installed-devices-store"
import type { components } from "@/lib/api/types"

type UserData = components["schemas"]["VisibleDataUserResponse"]
type HouseData = components["schemas"]["HouseWithAreas"]
type InstalledDevicesData = components["schemas"]["InstalledDeviceWithDeviceResponse"]


interface UserStoreInitializerProps {
    userData: UserData
    houseData: HouseData[]
    installedDeviceData: InstalledDevicesData[]
}
export function UserStoreInitializer({ userData, houseData, installedDeviceData }: UserStoreInitializerProps) {
    useUserStore.setState({ user: userData }) // ✅ fuera de hooks, durante el render del módulo
    useHouseStore.setState({ house: houseData })
    useInstalledDevicesStore.setState({ installedDevices: installedDeviceData })
    return null
}