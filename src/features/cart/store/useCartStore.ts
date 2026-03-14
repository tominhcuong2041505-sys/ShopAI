import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@features/product/domain/Product';
import { mmkvStorage } from '@shared/utils/mmkv-storage';
import { useAuthStore } from '@features/auth/store/useAuthStore';

// thuộc tính bổ sung cho sản phẩm khi đưa vào giỏ
export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

export interface CartState {
  /**
   * map từ userId (hoặc 'guest') tới list sản phẩm của tài khoản đó
   */
  carts: Record<string, CartItem[]>;
  currentUserId: string;
  items: CartItem[]; // tiện ích, luôn bằng carts[currentUserId] || []

  addToCart: (product: Product, selectedColor: string) => void;
  increaseQuantity: (id: string, selectedColor: string) => void;
  decreaseQuantity: (id: string, selectedColor: string) => void;
  removeFromCart: (id: string, selectedColor: string) => void;
  clearCart: () => void;
  switchUser: (userId: string) => void;
}

// helpers
const getAuthUserId = () => {
  const { user } = useAuthStore.getState();
  // previously we assumed user.id but the User type only has email/phone/fullName
  // using email as unique identifier ensures carts are tied per account
  return user?.email || 'guest';
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      carts: {},
      currentUserId: getAuthUserId(),
      items: [],

      addToCart: (product, selectedColor) => {
        set((state) => {
          const uid = state.currentUserId;
          const userCart = state.carts[uid] || [];
          const existingIndex = userCart.findIndex(
            (i) => i.id === product.id && i.selectedColor === selectedColor
          );
          let updated: CartItem[];
          if (existingIndex !== -1) {
            updated = [...userCart];
            updated[existingIndex].quantity += 1;
          } else {
            const newItem: CartItem = {
              ...product,
              quantity: 1,
              selectedColor,
            };
            updated = [...userCart, newItem];
          }
          return {
            carts: { ...state.carts, [uid]: updated },
            items: updated,
          };
        });
      },

      increaseQuantity: (id, selectedColor) => {
        set((state) => {
          const uid = state.currentUserId;
          const userCart = state.carts[uid] || [];
          const updated = userCart.map((i) =>
            i.id === id && i.selectedColor === selectedColor
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
          return {
            carts: { ...state.carts, [uid]: updated },
            items: updated,
          };
        });
      },

      decreaseQuantity: (id, selectedColor) => {
        set((state) => {
          const uid = state.currentUserId;
          const userCart = state.carts[uid] || [];
          const updated = userCart
            .map((i) =>
              i.id === id && i.selectedColor === selectedColor
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0);
          return {
            carts: { ...state.carts, [uid]: updated },
            items: updated,
          };
        });
      },

      removeFromCart: (id, selectedColor) => {
        set((state) => {
          const uid = state.currentUserId;
          const userCart = state.carts[uid] || [];
          const updated = userCart.filter(
            (i) => !(i.id === id && i.selectedColor === selectedColor)
          );
          return {
            carts: { ...state.carts, [uid]: updated },
            items: updated,
          };
        });
      },

      clearCart: () => {
        set((state) => {
          const uid = state.currentUserId;
          return {
            carts: { ...state.carts, [uid]: [] },
            items: [],
          };
        });
      },

      switchUser: (userId) => {
        set((state) => ({
          currentUserId: userId,
          items: state.carts[userId] || [],
        }));
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// subscribe to auth changes so cart updates automatically
useAuthStore.subscribe((state) => {
  const uid = state.user?.email || 'guest';
  useCartStore.getState().switchUser(uid);
});

// ensure initial sync as well (cart may have been rehydrated)
{
  const uid = useAuthStore.getState().user?.email || 'guest';
  useCartStore.getState().switchUser(uid);
}