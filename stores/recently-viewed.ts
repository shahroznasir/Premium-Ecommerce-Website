import { create } from "zustand";

interface ViewedProduct {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  category: string;
}

interface RecentlyViewedStore {
  products: ViewedProduct[];

  addProduct: (
    product: ViewedProduct
  ) => void;
}

export const useRecentlyViewed =
  create<RecentlyViewedStore>(
    (set, get) => ({
      products: [],

      addProduct: (product) => {
        const existing =
          get().products.filter(
            (item) =>
              item.id !== product.id
          );

        set({
          products: [
            product,
            ...existing,
          ].slice(0, 6),
        });
      },
    })
  );