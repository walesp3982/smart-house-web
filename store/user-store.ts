import { create } from "zustand"
import type { components } from "@/lib/api/types"

export type UserData = components["schemas"]["VisibleDataUserResponse"]

interface UserStore {
    user: UserData | null,
    setUser: (user: UserData) => void
    clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}))