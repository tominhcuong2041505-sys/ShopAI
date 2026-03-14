import apiClient from '@shared/api/apiClient';
import { Product } from '@features/product/domain/Product'; 

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Lấy danh sách sản phẩm thất bại:', error);
    throw error;
  }
};