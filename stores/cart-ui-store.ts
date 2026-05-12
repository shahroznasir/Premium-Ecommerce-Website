import { create } from "zustand";

interface CartUIStore {
  isOpen: boolean;

  openCart: () => void;

  closeCart: () => void;
}

export const useCartUIStore =
  create<CartUIStore>((set) => ({
    isOpen: false,

    openCart: () =>
      set({
        isOpen: true,
      }),

    closeCart: () =>
      set({
        isOpen: false,
      }),
  }));