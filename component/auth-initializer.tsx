"use client"
import { useUserStore } from "@/store/user-store"
import { useHouseStore } from "@/store/house-store"
import { useInstalledDevicesStore } from "@/store/installed-devices-store"
import type { components } from "@/lib/api/types"
import { useRef } from "react"

type UserData = components["schemas"]["VisibleDataUserResponse"]
type HouseData = components["schemas"]["HouseWithAreasResponse"]
type InstalledDevicesData = components["schemas"]["InstalledDeviceWithDeviceResponse"]


interface UserStoreInitializerProps {
    userData: UserData
    houseData: HouseData[]
    installedDeviceData: InstalledDevicesData[]
}
export function UserStoreInitializer({ userData, houseData, installedDeviceData }: UserStoreInitializerProps) {
    const initilized = useRef(false)

    if (!initilized.current) {
        initilized.current = true
        useUserStore.setState({ user: userData })
        useHouseStore.setState({ house: houseData })
        useInstalledDevicesStore.setState({ installedDevices: installedDeviceData })
    }
    // useMemo(() => {
    //     useUserStore.setState({ user: userData })
    //     useHouseStore.setState({ house: houseData })
    //     useInstalledDevicesStore.setState({ installedDevices: installedDeviceData })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    return null
}