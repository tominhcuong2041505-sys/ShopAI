import axios, { 
  InternalAxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios';
import { Platform } from 'react-native';

// Cấu hình URL cơ sở tùy theo thiết bị chạy (Simulator/Emulator hoặc Real Device)
// 10.0.2.2 là địa chỉ localhost dành cho Android Emulator
const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:3000' 
  : 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor cho Request: Tự động đính kèm Token trước khi gửi đi
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ghi chú: Sau này khi làm xong AuthStore (Zustand), bạn sẽ lấy token tại đây
    // const token = useAuthStore.getState().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor cho Response: Xử lý dữ liệu hoặc lỗi tập trung
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Bạn có thể trả về response.data để ở ngoài Service không cần gọi .data nữa
    return response;
  },
  (error: AxiosError) => {
    // Xử lý các lỗi HTTP phổ biến (401, 403, 500...)
    if (error.response?.status === 401) {
      console.log('Hết hạn phiên đăng nhập hoặc chưa đăng nhập');
    }
    return Promise.reject(error);
  }
);

export default apiClient;