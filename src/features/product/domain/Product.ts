export interface Product {
  id: string;          // ID sản phẩm (thường là string từ MongoDB/NestJS)
  name: string;        // Tên linh kiện/mặt hàng
  price: number;       // Giá tiền
  image: string;       // Đường dẫn ảnh (URL hoặc require)
  description?: string; // Mô tả chi tiết (không bắt buộc)
  category?: string;   // Danh mục sản phẩm
  stock?: number;      // Số lượng còn trong kho

  // additional optional fields used in mock and UI
  oldPrice?: number;
  colors?: string[];
  quickSpecs?: Record<string, string>;
  details?: Record<string, string>;
}