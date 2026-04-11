import { create } from "zustand"
import type { components } from "@/lib/api/types"

type DevicesInstalledType = components["schemas"]["InstalledDeviceWithDeviceResponse"]


interface InstalledDeviceStore {
    installedDevices: DevicesInstalledType[] | null
    setInstalledDevices: (installedDevices: DevicesInstalledType[]) => void
    clearInstalledDevices: () => void
    addInstalledDevices: (installedDevice: DevicesInstalledType) => void
}

export const useInstalledDevicesStore = create<InstalledDeviceStore>((set) => ({
    installedDevices: null,
    setInstalledDevices: (installedDevices) => set({ installedDevices }),
    clearInstalledDevices: () => set({ installedDevices: null }),
    addInstalledDevices: (installedDevice) => set((state) => ({
        installedDevices: state.installedDevices ? [...state.installedDevices, installedDevice] : [installedDevice]
    }))
}))