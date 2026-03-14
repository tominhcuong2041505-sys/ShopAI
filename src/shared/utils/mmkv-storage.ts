import { StateStorage } from 'zustand/middleware';

// Ép TypeScript nhận diện MMKV dưới dạng module require để hết báo lỗi Type
const { MMKV } = require('react-native-mmkv');

const storage = new MMKV();

export const mmkvStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  getItem: (name: string): string | null => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};