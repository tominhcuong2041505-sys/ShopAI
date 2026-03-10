import { create } from "zustand";
import { Product } from "../domain/entities/Product";

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, color: string) => void;
  increaseQuantity: (productId: string, color: string) => void;
  decreaseQuantity: (productId: string, color: string) => void;
  removeFromCart: (productId: string, color: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product, color) =>
    set((state) => {
      const keyColor = color || product.colors?.[0] || "Mặc định";
      const existingIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.selectedColor === keyColor
      );

      if (existingIndex !== -1) {
        const updated = [...state.cart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return { cart: updated };
      }

      const newItem: CartItem = {
        ...product,
        selectedColor: keyColor,
        quantity: 1,
      };

      return { cart: [...state.cart, newItem] };
    }),

  increaseQuantity: (productId, color) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.selectedColor === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (productId, color) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === productId && item.selectedColor === color
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  removeFromCart: (productId, color) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === productId && item.selectedColor === color)
      ),
    })),

  clearCart: () => set({ cart: [] }),
}));

