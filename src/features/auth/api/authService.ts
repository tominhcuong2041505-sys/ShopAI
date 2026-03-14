import apiClient from '@shared/api/apiClient';
// @ts-ignore (react-native async storage types may not be installed yet)
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegisterFormData } from '../domain/registerSchema';
import { User } from '@shared/domain/User';

const USERS_KEY = '@ShopAI:users';

interface StoredUser extends User {
  email: string;
  password: string; // plain text for demo only
}

async function loadUsers(): Promise<StoredUser[]> {
  const json = await AsyncStorage.getItem(USERS_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

async function saveUsers(users: StoredUser[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Fake remote login/registration logic. In production these would hit
 * real endpoints but for now we store credentials locally so the
 * app behaves as expected (cannot login before registering).
 */

export const registerAPI = async (data: RegisterFormData): Promise<{ token: string }> => {
  const users = await loadUsers();
  if (users.find((u) => u.email === data.email)) {
    throw new Error('Email đã tồn tại');
  }
  const newUser: StoredUser = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    password: data.password,
  };
  users.push(newUser);
  await saveUsers(users);
  // lưu thông tin người dùng hiện tại để profileService biết
  await AsyncStorage.setItem('@ShopAI:currentUserEmail', data.email);
  const token = String(Date.now()); // token giả
  return { token };
};

export const loginAPI = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const users = await loadUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    throw new Error('Email hoặc mật khẩu không đúng');
  }
  await AsyncStorage.setItem('@ShopAI:currentUserEmail', email);
  const token = String(Date.now());
  return { token };
};

export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const users = await loadUsers();
  return users.every((u) => u.email !== email);
};

/**
 * Change the current user's password. We verify the old password and
 * update the stored record. Throws if the old password doesn't match
 * or no user is logged in.
 */
export const changePasswordAPI = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const email = await AsyncStorage.getItem('@ShopAI:currentUserEmail');
  if (!email) throw new Error('No logged-in user');
  const users = await loadUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) throw new Error('User not found');
  if (users[idx].password !== oldPassword) {
    throw new Error('Mật khẩu hiện tại không chính xác');
  }
  users[idx].password = newPassword;
  await saveUsers(users);
};

// legacy stub in case someone still imports 'login'
export const login = async (data: any) => {
  return await apiClient.post('/auth/login', data);
};