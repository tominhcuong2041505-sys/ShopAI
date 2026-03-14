import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Sử dụng đường dẫn chuẩn trong project của bạn
import { getProducts } from '@features/product/api/productService';
import { Product } from '@features/product/domain/Product';
import { useCartStore, CartState } from '@features/cart/store/useCartStore';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2; 

// DỮ LIỆU ĐÃ ĐƯỢC CHUẨN HÓA: Giữ nguyên chi tiết của bạn kia, nhưng đổi price thành số (number)
const MOCK_PRODUCTS: Product[] = [
  // CPU (5 sản phẩm)
  {
    id: "cpu01", name: "Intel Core i9-14900K", price: 15500000, oldPrice: 17990000, category: "CPU",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7JayNc78UpCG1cmYGwbMhnyQWNJZNikqrJvA_2d9UEozJhNJBNul1ylfDpDmqVyhRaXvOascFl9T-DCTYiWydY2AqGggtWZbnJy28tc4nnJ0igMWzhrszOqVN8vjrICOLAE3d2ug&usqp=CAc",
    colors: ["Đen", "Bạc"],
    quickSpecs: { cpu: "Intel Core i9-14900K (24 nhân 32 luồng)", ram: "DDR5 32GB", vga: "Tùy chọn rời", storage: "SSD 1TB NVMe", display: "Phụ thuộc cấu hình" },
    details: { brand: "Intel", warranty: "36 tháng", series: "Core i9", partNumber: "BX8071514900K" },
    description: "Intel Core i9-14900K là bộ vi xử lý đầu bảng của Intel, phù hợp cho gaming, streaming và công việc sáng tạo nội dung nặng."
  },
  {
    id: "cpu02", name: "Intel Core i7-14700K", price: 10800000, category: "CPU",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSnKe_55wNT1rxGvimdgUwPrd-Fq-GUyllT44WYZsNg19Za5TaFGANlstzoFQuvYTX3bTc8xF-XZo9PAXdolvsI9lbrf-u_G-OCl7S_axeAB_IsjwkL_ZvB7fmPYlqQzahfqNADkw&usqp=CAc",
    colors: ["Đen"],
    quickSpecs: { cpu: "Intel Core i7-14700K (20 nhân 28 luồng)", ram: "DDR5 32GB", vga: "Tùy chọn rời", storage: "SSD 1TB NVMe" },
    details: { brand: "Intel", warranty: "36 tháng", series: "Core i7", partNumber: "BX8071514700K" },
    description: "Lựa chọn tối ưu cho game thủ và creator với mức giá cân bằng giữa hiệu năng và chi phí."
  },
  {
    id: "cpu03", name: "Intel Core i5-13600K", price: 7500000, category: "CPU",
    image: "https://m.media-amazon.com/images/I/51H9kH75SGL._AC_SL1200_.jpg",
    colors: ["Đen"],
    quickSpecs: { cpu: "Intel Core i5-13600K (14 nhân 20 luồng)", ram: "DDR5 16GB", vga: "Tùy chọn rời", storage: "SSD 512GB NVMe" },
    details: { brand: "Intel", warranty: "36 tháng", series: "Core i5", partNumber: "BX8071513600K" },
    description: "CPU quốc dân cho gaming hiệu năng cao, phù hợp với đa số cấu hình tầm trung."
  },
  {
    id: "cpu04", name: "Intel Core i3-12100F", price: 2300000, category: "CPU",
    image: "https://m.media-amazon.com/images/I/51v81648Y7L._AC_SL1000_.jpg",
    colors: ["Đen"],
    quickSpecs: { cpu: "Intel Core i3-12100F (4 nhân 8 luồng)", ram: "DDR4 8GB", vga: "Yêu cầu VGA rời", storage: "SSD 256GB" },
    details: { brand: "Intel", warranty: "36 tháng", series: "Core i3", partNumber: "BX8071512100F" },
    description: "Giải pháp tiết kiệm cho các cấu hình văn phòng và gaming nhẹ."
  },
  {
    id: "cpu05", name: "AMD Ryzen 9 7950X", price: 14200000, category: "CPU",
    image: "https://m.media-amazon.com/images/I/6166O-S98gL._AC_SL1200_.jpg",
    colors: ["Đen", "Đỏ"],
    quickSpecs: { cpu: "AMD Ryzen 9 7950X (16 nhân 32 luồng)", ram: "DDR5 32GB", vga: "Tùy chọn rời", storage: "SSD 1TB NVMe" },
    details: { brand: "AMD", warranty: "36 tháng", series: "Ryzen 7000", partNumber: "100-100000514WOF" },
    description: "CPU cao cấp của AMD trên nền tảng AM5, mạnh mẽ cho cả làm việc lẫn giải trí."
  },

  // MOBILE (10 sản phẩm)
  {
    id: "ip15pm", name: "iPhone 15 Pro Max 256GB", price: 29990000, oldPrice: 33990000, category: "Mobile",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGOzRjLZUQXZkhZtVuksgM3CWXMc0wNreRFnNrloMEHN3imumHPtpR5yXSsDAVCvtCiwGJXdZEt8KZWiYOsL5Yjx6kh5bRt-pOmxR9HZoBNwOGzbOggdISlGE_dizFaQ3R5Jf1dQ&usqp=CAc",
    colors: ["Titan Xanh", "Titan Tự nhiên", "Titan Đen"],
    quickSpecs: { cpu: "Apple A17 Pro 6 nhân", ram: "8GB", storage: "256GB", display: "6.7\" OLED 120Hz", os: "iOS 17" },
    details: { brand: "Apple", warranty: "12 tháng", series: "iPhone 15 Pro Max" },
    description: "iPhone 15 Pro Max sở hữu khung viền titan, chip A17 Pro mạnh mẽ và thời lượng pin ấn tượng."
  },
  {
    id: "s24u", name: "Samsung Galaxy S24 Ultra", price: 26500000, category: "Mobile",
    image: "https://m.media-amazon.com/images/I/71WjsZmiAuL._AC_SL1500_.jpg",
    colors: ["Xám", "Tím", "Đen"],
    quickSpecs: { cpu: "Snapdragon 8 Gen 3", ram: "12GB", storage: "256GB", display: "6.8\" AMOLED 120Hz", os: "Android 14" },
    details: { brand: "Samsung", warranty: "12 tháng", series: "Galaxy S24 Ultra" },
    description: "Flagship cao cấp nhất của Samsung với bút S Pen, màn hình siêu sáng, nhiều tính năng AI."
  },
  { id: "ip14", name: "iPhone 14 128GB Blue", price: 16200000, category: "Mobile", image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg", colors: ["Xanh dương", "Đen"] },
  { id: "zfold5", name: "Galaxy Z Fold5 512GB", price: 32000000, category: "Mobile", image: "https://m.media-amazon.com/images/I/716n8S38S9L._AC_SL1500_.jpg", colors: ["Xanh", "Đen"] },
  { id: "mi14", name: "Xiaomi 14 Ultra 5G", price: 24900000, category: "Mobile", image: "https://m.media-amazon.com/images/I/61Nl-Hh2GHL._AC_SL1500_.jpg", colors: ["Trắng", "Đen"] },
  { id: "op12", name: "OnePlus 12 16GB RAM", price: 18500000, category: "Mobile", image: "https://m.media-amazon.com/images/I/71S-O-v0-4L._AC_SL1500_.jpg", colors: ["Xanh", "Đen"] },
  { id: "pixel8", name: "Google Pixel 8 Pro", price: 21000000, category: "Mobile", image: "https://m.media-amazon.com/images/I/71u969i8baL._AC_SL1500_.jpg", colors: ["Xanh biển", "Đen"] },
  { id: "rog8", name: "ROG Phone 8 Pro", price: 27500000, category: "Mobile", image: "https://m.media-amazon.com/images/I/61Uax+8Z-ZL._AC_SL1500_.jpg", colors: ["Đen", "Trắng"] },
  { id: "v29", name: "Vivo V29 5G", price: 9800000, category: "Mobile", image: "https://m.media-amazon.com/images/I/61O2O+6C6SL._AC_SL1200_.jpg", colors: ["Hồng", "Xanh"] },
  { id: "re11", name: "Oppo Reno11 Pro", price: 12500000, category: "Mobile", image: "https://m.media-amazon.com/images/I/71-R5u7X9rL._AC_SL1500_.jpg", colors: ["Xanh", "Trắng"] },

  // VGA (5 sản phẩm)
  {
    id: "vga01", name: "ASUS ROG Strix RTX 4090", price: 45990000, category: "VGA",
    image: "https://product.hstatic.net/1000333506/product/asus-rog-strix-rtx4090-24g-gaming-01_db14ea40771a4fbfad085487d4475753_grande.jpg",
    colors: ["Đen"],
    quickSpecs: { cpu: "NVIDIA GeForce RTX 4090", vga: "24GB GDDR6X", ram: "Khuyến nghị 32GB", storage: "Yêu cầu PSU 1000W" },
    details: { brand: "ASUS", warranty: "36 tháng", series: "ROG Strix" },
    description: "Card đồ họa cao cấp nhất dòng GeForce RTX 40-series của ASUS, phù hợp cho 4K gaming và render 3D nặng."
  },
  { id: "vga02", name: "MSI RTX 4080 Suprim X", price: 32500000, category: "VGA", image: "https://m.media-amazon.com/images/I/81I-u8t9UHL._AC_SL1500_.jpg", colors: ["Bạc"] },
  { id: "vga03", name: "Gigabyte RTX 4070 Ti", price: 22800000, category: "VGA", image: "https://m.media-amazon.com/images/I/81xI7nLz6CL._AC_SL1500_.jpg", colors: ["Đen"] },
  { id: "vga04", name: "Zotac RTX 4060 8GB", price: 8500000, category: "VGA", image: "https://m.media-amazon.com/images/I/71B6-C5pA3L._AC_SL1500_.jpg", colors: ["Đen"] },
  { id: "vga05", name: "Sapphire RX 7900 XTX", price: 28900000, category: "VGA", image: "https://m.media-amazon.com/images/I/71-LzD-E0fL._AC_SL1500_.jpg", colors: ["Đen"] },

  // LINH KIỆN KHÁC (10 sản phẩm)
  { id: 'ram01', name: 'Corsair Vengeance RGB 32GB', price: 3200000, category: 'RAM', image: 'https://m.media-amazon.com/images/I/719f-w-SFTL._AC_SL1500_.jpg', colors: ["Đen"] },
  { id: 'psu01', name: 'Corsair RM1000e Gold', price: 4500000, category: 'PSU', image: 'https://m.media-amazon.com/images/I/71yL3Q6Xz-L._AC_SL1500_.jpg', colors: ["Đen"] },
  { id: 'case01', name: 'Lian Li O11 Dynamic EVO', price: 4800000, category: 'CASE', image: 'https://m.media-amazon.com/images/I/71Z5-yG6RGL._AC_SL1500_.jpg', colors: ["Trắng", "Đen"] },
  { id: 'ram02', name: 'G.Skill Trident Z5 Neo', price: 3800000, category: 'RAM', image: 'https://m.media-amazon.com/images/I/61Nl2S86YVL._AC_SL1500_.jpg', colors: ["Đen"] },
  { id: 'psu02', name: 'ASUS ROG Thor 1200W', price: 8200000, category: 'PSU', image: 'https://m.media-amazon.com/images/I/81H+M0K0WpL._AC_SL1500_.jpg', colors: ["Đen"] },
  { id: 'case02', name: 'NZXT H9 Flow White', price: 4200000, category: 'CASE', image: 'https://m.media-amazon.com/images/I/71G8N36rGcL._AC_SL1500_.jpg', colors: ["Trắng"] },
  { id: 'ram03', name: 'Kingston Fury Renegade', price: 2900000, category: 'RAM', image: 'https://m.media-amazon.com/images/I/61G7h5-mYLL._AC_SL1500_.jpg', colors: ["Đen"] },
  { id: 'psu03', name: 'Cooler Master MWE 750', price: 1800000, category: 'PSU', image: 'https://m.media-amazon.com/images/I/71-v42G6W5L._AC_SL1500_.jpg', colors: ["Đen"] },
  { id: 'case03', name: 'Corsair 4000D Airflow', price: 2500000, category: 'CASE', image: 'https://m.media-amazon.com/images/I/81T6p-v1m0L._AC_SL1500_.jpg', colors: ["Trắng", "Đen"] },
  { id: 'ssd01', name: 'Samsung 990 Pro 2TB', price: 4900000, category: 'SSD', image: 'https://m.media-amazon.com/images/I/61M-F8pZtEL._AC_SL1500_.jpg', colors: ["Đen"] },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // SỬ DỤNG ZUSTAND CỦA BẠN (đã import CartState để TypeScript biết kiểu)
  const cartCount = useCartStore((state: CartState) =>
    state.items ? state.items.reduce((total, item) => total + item.quantity, 0) : 0
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      // Khi server API chưa bật, nạp MOCK_PRODUCTS siêu chi tiết này vào
      setProducts(MOCK_PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0056A4" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* HEADER */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <View className="flex-1 bg-gray-100 flex-row items-center px-4 py-2 rounded-2xl">
          <Icon name="search-outline" size={20} color="#6b7280" />
          <TextInput 
            className="flex-1 ml-2 text-gray-800"
            placeholder="Tìm kiếm VGA, CPU, Mobile..."
            onChangeText={setSearch}
          />
        </View>
        
        {/* NÚT GIỎ HÀNG */}
        <TouchableOpacity 
          className="ml-4" 
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="cart-outline" size={28} color="#0056A4" />
          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[20px] h-5 justify-center items-center border-2 border-white px-1">
              <Text className="text-white text-[10px] font-bold">{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BANNER */}
        <View className="mx-4 mt-4 shadow-lg bg-gray-100 rounded-3xl overflow-hidden">
          <Image 
            source={{ uri: 'https://bizweb.dktcdn.net/100/329/122/files/mmz-build-nnck-homepagebanner-870x433.jpg?v=1689244226023' }} 
            style={{ width: '100%', aspectRatio: 2 / 1 }}
            resizeMode="cover"
          />
        </View>

        {/* DANH SÁCH LINH KIỆN */}
        <View className="px-4 pt-6 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-900">Danh sách sản phẩm</Text>
          <Text className="text-blue-600 font-medium">{filteredProducts.length} món</Text>
        </View>

        {/* LƯỚI SẢN PHẨM (Giao diện chuẩn của bạn bạn) */}
        <View className="p-4 flex-row flex-wrap justify-between">
          {filteredProducts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              // CHUYỂN HƯỚNG MANG THEO DỮ LIỆU ĐẦY ĐỦ SANG TRANG CHI TIẾT
              onPress={() => navigation.navigate("ProductDetail", { product: item })}
              style={{ width: ITEM_WIDTH }}
              className="bg-white mb-4 p-3 rounded-2xl border border-gray-100 shadow-sm"
            >
              <View className="w-full aspect-square bg-white justify-center items-center rounded-xl overflow-hidden mb-2">
                <Image 
                  source={{ uri: item.image }} 
                  style={{ width: '90%', height: '90%' }} 
                  resizeMode="contain" 
                />
              </View>

              <Text className="text-[10px] text-blue-600 font-bold uppercase">{item.category}</Text>
              <Text className="font-bold text-gray-800 h-10" numberOfLines={2}>{item.name}</Text>
              
              {/* Định dạng lại giá tiền từ số thành chuỗi 15.500.000đ */}
              <Text className="text-red-500 font-bold mt-1 text-base">
                {item.price.toLocaleString('vi-VN')}đ
              </Text>
            </TouchableOpacity>
          ))}
          
          {filteredProducts.length === 0 && (
            <View className="w-full py-20 items-center">
              <Icon name="search-outline" size={60} color="#e5e7eb" />
              <Text className="text-gray-400 mt-4">Không tìm thấy linh kiện...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}