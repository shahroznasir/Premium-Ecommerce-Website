import { create } from "zustand";

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
}

interface WishlistStore {
  items: WishlistItem[];

  addItem: (
    item: WishlistItem
  ) => void;

  removeItem: (
    id: string
  ) => void;

  isInWishlist: (
    id: string
  ) => boolean;
}

export const useWishlistStore =
  create<WishlistStore>((set, get) => ({
    items: [],

    addItem: (item) => {
      const exists = get().items.find(
        (i) => i.id === item.id
      );

      if (exists) return;

      set({
        items: [
          ...get().items,
          item,
        ],
      });
    },

    removeItem: (id) => {
      set({
        items: get().items.filter(
          (item) => item.id !== id
        ),
      });
    },

    isInWishlist: (id) => {
      return get().items.some(
        (item) => item.id === id
      );
    },
  }));