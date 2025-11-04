import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  selectedCurrency: string;
  setSelectedCurrency: (value: string) => void;
  isDepositModalOpen: boolean;
  openDepositModal: () => void;
  closeDepositModal: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      selectedCurrency: "BTC",
      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
      isDepositModalOpen: false,
      openDepositModal: () => set({ isDepositModalOpen: true }),
      closeDepositModal: () => set({ isDepositModalOpen: false }),
    }),
    {
      name: "wallet-storage",
    }
  )
);
