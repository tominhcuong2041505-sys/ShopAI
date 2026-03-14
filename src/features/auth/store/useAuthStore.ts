import { create } from 'zustand';
import { getProfileAPI, updateProfileAPI } from '@features/profile/api/profileService';
import { User } from '@shared/domain/User';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { loginAPI } = await import('@features/auth/api/authService');
      const { token } = await loginAPI(email, password);
      set({ token, isLoggedIn: true });
      await get().fetchProfile();
    } catch (err) {
      // rethrow so screen can show error
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null, isLoggedIn: false });
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const { registerAPI } = await import('@features/auth/api/authService');
      const { token } = await registerAPI(data as any);
      set({ token, isLoggedIn: true });
      await get().fetchProfile();
    } catch (err) {
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProfile: async () => {
    const { token } = get();
    if (!token) return;

    set({ isLoading: true });
    try {
      const userData = await getProfileAPI(token);
      set({ user: userData });
    } catch (error) {
      console.error("Lỗi lấy dữ liệu user:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data: Partial<User>) => {
    const { token, user } = get();
    if (!token || !user) {
      throw new Error('Không có token hoặc người dùng');
    }

    set({ isLoading: true });
    try {
      const updatedUser = await updateProfileAPI(token, data);
      set({ user: { ...user, ...updatedUser } });
    } catch (error) {
      console.error("Lỗi cập nhật user:", error);
      throw error; // rethrow so callers know
    } finally {
      set({ isLoading: false });
    }
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const { token } = get();
    if (!token) {
      throw new Error('Không có token');
    }

    set({ isLoading: true });
    try {
      const { changePasswordAPI } = await import('@features/auth/api/authService');
      await changePasswordAPI(oldPassword, newPassword);
    } catch (error) {
      console.error('Lỗi đổi mật khẩu:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));