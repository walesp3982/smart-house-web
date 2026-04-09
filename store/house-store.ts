import type { components } from "@/lib/api/types"
import { create } from "zustand"

type HouseData = components["schemas"]["HouseWithAreas"]

interface HouseStore {
    house: HouseData[] | null,
    setHouse: (house: HouseData[]) => void
    clearHouse: () => void
}

export const useHouseStore = create<HouseStore>((set) => ({
    house: null,
    setHouse: (house) => set({ house }),
    clearHouse: () => set({ house: null })
}))