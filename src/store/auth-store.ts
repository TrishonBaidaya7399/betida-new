import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  username: string;
  email: string;
  vipProgress: number;
  level: string;
  nextLevel: string;
  showPopupItem: boolean;
};

export const useAuthStore = create(
  persist<{
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
  }>(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage", 
    }
  )
);
