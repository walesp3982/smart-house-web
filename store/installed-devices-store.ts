import { create } from "zustand"
import type { components } from "@/lib/api/types"
export type InstalledDeviceType = components["schemas"]["InstalledDeviceWithDeviceResponse"]

const IDLE_STATE: DeviceSocketState = { status: "idle", lastMessage: null }

export type DeviceStatus = "connecting" | "open" | "closed" | "error" | "idle" | "fetching-ticket"
export type DeviceSocketState = {
    status: DeviceStatus
    lastMessage: string | null
}

interface InstalledDeviceStore {
    installedDevices: InstalledDeviceType[] | null
    setInstalledDevices: (installedDevices: InstalledDeviceType[]) => void
    clearInstalledDevices: () => void
    addInstalledDevices: (installedDevice: InstalledDeviceType) => void

    // Websocket state
    deviceState: Record<number, DeviceSocketState>
    updateDeviceState: (uuid: number, patch: Partial<DeviceSocketState>) => void
}

export const selectDeviceState = (uuid: number) => (state: InstalledDeviceStore): DeviceSocketState =>
    state.deviceState[uuid] ?? IDLE_STATE

export const useInstalledDevicesStore = create<InstalledDeviceStore>((set) => ({
    installedDevices: null,
    setInstalledDevices: (installedDevices) => set({ installedDevices }),
    clearInstalledDevices: () => set({ installedDevices: null }),
    addInstalledDevices: (installedDevice) => set((state) => ({
        installedDevices: state.installedDevices ? [...state.installedDevices, installedDevice] : [installedDevice]
    })),

    // Websocket
    deviceState: {},
    updateDeviceState(uuid, patch) {
        set((state) => ({
            deviceState: {
                ...state.deviceState,
                [uuid]: {
                    ...(state.deviceState[uuid] ?? { status: "idle", lastMessage: null }),
                    ...patch
                }
            }
        }))
    },
}))