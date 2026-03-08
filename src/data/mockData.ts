import { Product } from '../types';

export const MOCK_PRODUCT: Product = {
  id: 'p1',
  name: 'Áo Thun Nam Nữ Unisex Form Rộng Tay Lỡ Cotton 100% In Hình Gấu Bear Phong Cách Hàn Quốc',
  description: 'Chất liệu: Cotton 100% 2 chiều, vải mềm mịn, thấm hút mồ hôi tốt. \nÁo thun form rộng tay lỡ phong cách Hàn Quốc.\nHình in sắc nét, không bong tróc.',
  price: 159000,
  originalPrice: 250000,
  rating: 4.9,
  soldCount: 1200,
  images: [
    'https://picsum.photos/800/800?random=1',
    'https://picsum.photos/800/800?random=2',
    'https://picsum.photos/800/800?random=3',
    'https://picsum.photos/800/800?random=4',
    'https://picsum.photos/800/800?random=5',
  ],
  variants: {
    colors: [
      { id: 'v1', name: 'Trắng', image: 'https://picsum.photos/200/200?random=1', stock: 50 },
      { id: 'v2', name: 'Đen', image: 'https://picsum.photos/200/200?random=2', stock: 20 },
      { id: 'v3', name: 'Xám', image: 'https://picsum.photos/200/200?random=3', stock: 0 }, // Out of stock
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  shop: {
    name: 'Fashion Studio Official',
    location: 'Hà Nội',
  },
  badges: ['Voucher Xtra', 'Freeship Xtra'],
};