import type { components } from "@/lib/api/types"
import { create } from "zustand"

export type HouseType = components["schemas"]["HouseWithAreasResponse"]
export type AreaType = components["schemas"]["AreaResponse"]
interface HouseStore {
    house: HouseType[] | null,
    setHouse: (house: HouseType[]) => void
    clearHouse: () => void
}

export const useHouseStore = create<HouseStore>((set) => ({
    house: null,
    setHouse: (house) => set({ house }),
    clearHouse: () => set({ house: null })
}))