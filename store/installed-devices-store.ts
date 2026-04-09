import { create } from "zustand"
import type { components } from "@/lib/api/types"

type DevicesInstalledType = components["schemas"]["InstalledDeviceWithDeviceResponse"]


interface InstalledDeviceStore {
    installedDevices: DevicesInstalledType[] | null
    setInstalledDevices: (installedDevices: DevicesInstalledType[]) => void
    clearInstalledDevices: () => void
}

export const useInstalledDevicesStore = create<InstalledDeviceStore>((set) => ({
    installedDevices: null,
    setInstalledDevices: (installedDevices) => set({ installedDevices }),
    clearInstalledDevices: () => set({ installedDevices: null })
}))