import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

// Import từ project của bạn
import { Product } from "@features/product/domain/Product";
import { useCartStore, CartState } from "@features/cart/store/useCartStore";

// KHỐI COMPONENT CHỌN MÀU (Của bạn kia)
interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  onSelect: (color: string) => void;
}
const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onSelect }) => {
  if (!colors || colors.length === 0) return null;
  return (
    <View className="bg-white p-4 mb-2">
      <Text className="text-sm font-bold text-gray-800 mb-3">MÀU SẮC / PHÂN LOẠI</Text>
      <View className="flex-row flex-wrap gap-3">
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => onSelect(color)}
            className={`border px-4 py-2 rounded-lg ${
              selectedColor === color ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <Text className={selectedColor === color ? 'text-blue-600 font-bold' : 'text-gray-700'}>
              {color}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function ProductDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  // 1. Nhận dữ liệu product thật từ HomeScreen truyền sang
  const product: Product = route.params?.product;

  // 2. Kết nối Zustand Store của bạn
  const addToCart = useCartStore((state: CartState) => state.addToCart);
  // badge count
  const cartItems = useCartStore((state: CartState) => state.items);
  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // 3. State quản lý màu sắc đang chọn
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Mặc định');

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Lỗi: Không tìm thấy thông tin sản phẩm</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    // Đẩy vào Zustand, không hiển thị thông báo
    addToCart(product, selectedColor);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      {/* HEADER NỔI */}
      <View className="absolute top-12 left-4 z-10 flex-row justify-between w-[92%] px-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-black/50 p-2.5 rounded-full">
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} className="bg-black/50 p-2.5 rounded-full">
          <Icon name="cart-outline" size={24} color="white" />
          {totalCount > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 justify-center items-center">
              <Text className="text-white text-xs font-bold">{totalCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* KHUNG HIỂN THỊ ẢNH */}
        <View className="w-full bg-white h-96 justify-center items-center border-b border-gray-100">
             {/* Nếu bạn có component ImageGallery thì dùng, ở đây tôi render ảnh trực tiếp để tránh lỗi thiếu file */}
             <Icon name="image-outline" size={100} color="#e5e7eb" className="absolute" />
             <View className="w-[80%] h-[80%]">
                 <Image source={{ uri: product.image }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
             </View>
        </View>

        {/* THÔNG TIN CƠ BẢN */}
        <View className="bg-white p-4 mb-2 shadow-sm">
          <Text className="text-2xl font-bold text-red-500 mb-2">
            {product.price.toLocaleString('vi-VN')}đ
          </Text>
          <Text className="text-lg font-bold text-gray-800 leading-7">
            {product.name}
          </Text>
        </View>

        {/* CHỌN MÀU SẮC (Giữ nguyên của nhóm bạn) */}
        <ColorSelector 
          colors={product.colors || []} 
          selectedColor={selectedColor} 
          onSelect={setSelectedColor} 
        />

        {/* CẤU HÌNH NHANH (quickSpecs) */}
        {product.quickSpecs && (
          <View className="bg-white p-4 mb-2 shadow-sm">
             <Text className="font-bold text-gray-800 mb-3 text-base">Thông số nổi bật</Text>
             {Object.entries(product.quickSpecs).map(([key, value]) => (
               <View key={key} className="flex-row py-2 border-b border-gray-100">
                  <Text className="w-24 text-gray-500 font-medium uppercase">{key}</Text>
                  <Text className="flex-1 text-gray-800">{value as string}</Text>
               </View>
             ))}
          </View>
        )}

        {/* MÔ TẢ */}
        <View className="bg-white p-4 mb-24 shadow-sm">
          <Text className="font-bold text-gray-800 mb-2 text-base">Mô tả sản phẩm</Text>
          <Text className="text-gray-600 leading-6 text-justify">
            {product.description || "Đang cập nhật mô tả..."}
          </Text>
        </View>
      </ScrollView>

      {/* THANH BOTTOM MUA HÀNG (Giữ nguyên của nhóm bạn) */}
      <View className="absolute bottom-0 w-full bg-white flex-row border-t border-gray-200 px-4 py-3 shadow-lg">
        <TouchableOpacity 
          className="flex-1 mr-3 border-2 border-blue-600 rounded-xl py-3 justify-center items-center bg-blue-50"
          onPress={handleAddToCart}
        >
          <Text className="text-sm font-bold text-blue-600">Thêm vào giỏ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-1 bg-blue-600 rounded-xl py-3 justify-center items-center shadow-md"
          onPress={() => {
            addToCart(product, selectedColor);
            navigation.navigate("Checkout");
          }}
        >
          <Text className="text-sm font-bold text-white">Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}