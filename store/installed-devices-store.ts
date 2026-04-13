import { create } from "zustand"
import type { components } from "@/lib/api/types"

export type InstalledDeviceType = components["schemas"]["InstalledDeviceWithDeviceResponse"]


interface InstalledDeviceStore {
    installedDevices: InstalledDeviceType[] | null
    setInstalledDevices: (installedDevices: InstalledDeviceType[]) => void
    clearInstalledDevices: () => void
    addInstalledDevices: (installedDevice: InstalledDeviceType) => void
}

export const useInstalledDevicesStore = create<InstalledDeviceStore>((set) => ({
    installedDevices: null,
    setInstalledDevices: (installedDevices) => set({ installedDevices }),
    clearInstalledDevices: () => set({ installedDevices: null }),
    addInstalledDevices: (installedDevice) => set((state) => ({
        installedDevices: state.installedDevices ? [...state.installedDevices, installedDevice] : [installedDevice]
    }))
}))