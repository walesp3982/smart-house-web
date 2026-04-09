"use client"
import { useUserStore } from "@/store/user-store"
import { useHouseStore } from "@/store/house-store"
import type { components } from "@/lib/api/types"

type UserData = components["schemas"]["VisibleDataUserResponse"]
export type HouseData = components["schemas"]["HouseWithAreas"]

interface UserStoreInitializerProps {
    userData: UserData
    houseData: HouseData[]
}
export function UserStoreInitializer({ userData, houseData }: UserStoreInitializerProps) {
    useUserStore.setState({ user: userData }) // ✅ fuera de hooks, durante el render del módulo
    useHouseStore.setState({ house: houseData })
    return null
}