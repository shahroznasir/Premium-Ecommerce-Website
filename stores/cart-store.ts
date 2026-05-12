import { create } from "zustand";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (
    product: Omit<CartItem, "quantity">
  ) => void;

  removeItem: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;

  getTotalPrice: () => number;

  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>(
  (set, get) => ({
    items: [],

    /* Add Item */
    addItem: (product) =>
      set((state) => {
        const existingItem = state.items.find(
          (item) => item.id === product.id
        );

        /* Increase Existing */
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity + 1,
                  }
                : item
            ),
          };
        }

        /* Add New */
        return {
          items: [
            ...state.items,
            {
              ...product,
              quantity: 1,
            },
          ],
        };
      }),

    /* Remove Item */
    removeItem: (id) =>
      set((state) => ({
        items: state.items.filter(
          (item) => item.id !== id
        ),
      })),

    /* Increase Quantity */
    increaseQuantity: (id) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        ),
      })),

    /* Decrease Quantity */
    decreaseQuantity: (id) =>
      set((state) => ({
        items: state.items
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
          )
          .filter(
            (item) => item.quantity > 0
          ),
      })),

    /* Clear Entire Cart */
    clearCart: () =>
      set({
        items: [],
      }),

    /* Total Price */
    getTotalPrice: () => {
      return get().items.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      );
    },

    /* Total Items */
    getTotalItems: () => {
      return get().items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );
    },
  })
);