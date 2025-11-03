import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  selectedCurrency: string;
  setSelectedCurrency: (value: string) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      selectedCurrency: "BTC",
      setSelectedCurrency: (value) => set({ selectedCurrency: value }),
    }),
    {
      name: "wallet-storage",
    }
  )
);