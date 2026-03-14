// profileService.ts
// Đây là nơi chứa các hàm gọi API thực tế liên quan đến thông tin người dùng.
// Trước đây file này lỡ copy store khiến vòng lặp import, bây giờ đã sửa lại.

// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@shared/domain/User';

// Because we store users locally in authService AsyncStorage, the profile
// endpoints simply read/write the current user's record.
const USERS_KEY = '@ShopAI:users';

async function loadUsers(): Promise<(User & { email: string; password?: string })[]> {
  const json = await AsyncStorage.getItem(USERS_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

async function saveUsers(users: any[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const getProfileAPI = async (token: string): Promise<User> => {
  const email = await AsyncStorage.getItem('@ShopAI:currentUserEmail');
  if (!email) throw new Error('No logged-in user');
  const users = await loadUsers();
  const found = users.find((u) => u.email === email);
  if (!found) throw new Error('User not found');
  const { password, ...rest } = found;
  return rest as User;
};

export const updateProfileAPI = async (
  token: string,
  data: Partial<User>
): Promise<User> => {
  const email = await AsyncStorage.getItem('@ShopAI:currentUserEmail');
  if (!email) throw new Error('No logged-in user');
  const users = await loadUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...data };
  await saveUsers(users);
  const { password, ...rest } = users[idx];
  return rest as User;
};
