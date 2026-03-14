import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@shared/utils/mmkv-storage';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export interface Address {
  id: string;
  name: string;
  phone: string;
  detail: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[]; // hiện tại, đối với user đang đăng nhập hoặc guest
  addressesByUser: Record<string, Address[]>;
  currentUserId: string;

  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updatedData: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
  switchUser: (userId: string) => void;
}

// Dữ liệu mẫu ban đầu để bạn test
// dữ liệu mẫu (chỉ dùng nếu muốn) nhưng mặc định để trống cho guest
const INITIAL_ADDRESSES: Address[] = [];

// helper similar to cart store - user key based on email
const getAuthUserId = () => {
  const { user } = useAuthStore.getState();
  return user?.email || 'guest';
};

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addressesByUser: { guest: INITIAL_ADDRESSES },
      currentUserId: getAuthUserId(),
      addresses: (getAuthUserId() === 'guest' ? INITIAL_ADDRESSES : []),

      addAddress: (newAddress) => set((state) => {
        const uid = state.currentUserId;
        const list = state.addressesByUser[uid] || [];

        const isFirst = list.length === 0;
        const willBeDefault = isFirst || newAddress.isDefault;

        const updatedAddresses = willBeDefault
          ? list.map(a => ({ ...a, isDefault: false }))
          : list;

        const final = [...updatedAddresses, { ...newAddress, id: Date.now().toString(), isDefault: willBeDefault }];
        return {
          addressesByUser: { ...state.addressesByUser, [uid]: final },
          addresses: final,
        };
      }),

      updateAddress: (id, updatedData) => set((state) => {
        const uid = state.currentUserId;
        let list = state.addressesByUser[uid] || [];
        let newAddresses = [...list];

        if (updatedData.isDefault) {
          newAddresses = newAddresses.map(a => ({ ...a, isDefault: false }));
        }

        const final = newAddresses.map(a => a.id === id ? { ...a, ...updatedData } : a);
        return {
          addressesByUser: { ...state.addressesByUser, [uid]: final },
          addresses: final,
        };
      }),

      deleteAddress: (id) => set((state) => {
        const uid = state.currentUserId;
        const list = state.addressesByUser[uid] || [];
        const final = list.filter(a => a.id !== id);
        return {
          addressesByUser: { ...state.addressesByUser, [uid]: final },
          addresses: final,
        };
      }),

      setDefault: (id) => set((state) => {
        const uid = state.currentUserId;
        const list = state.addressesByUser[uid] || [];
        const final = list.map(a => ({
          ...a,
          isDefault: a.id === id
        }));
        return {
          addressesByUser: { ...state.addressesByUser, [uid]: final },
          addresses: final,
        };
      }),

      switchUser: (userId) => {
        const list = get().addressesByUser[userId] || [];
        set({ currentUserId: userId, addresses: list });
      },
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => mmkvStorage), // convert StateStorage → PersistStorage
    }
  )
);

// listen for auth change and switch user accordingly
useAuthStore.subscribe((state) => {
  const uid = state.user?.email || 'guest';
  useAddressStore.getState().switchUser(uid);
});

// immediately sync once in case auth already has a user on startup
{
  const uid = useAuthStore.getState().user?.email || 'guest';
  useAddressStore.getState().switchUser(uid);
}