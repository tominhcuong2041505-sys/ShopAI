<<<<<<< HEAD
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    // container: full màn hình, canh giữa, nền xám nhạt
    <View className="flex-1 items-center justify-center bg-gray-100">
      
      {/* Thẻ Sản Phẩm: Nền trắng, bo góc, có đổ bóng (shadow) */}
      <View className="bg-white p-5 rounded-xl shadow-lg w-80">
        
        {/* Hình ảnh giả lập (khối màu xám) */}
        <View className="h-40 bg-gray-300 rounded-lg mb-4 items-center justify-center">
          <Text className="text-gray-500">Ảnh Sản Phẩm</Text>
        </View>

        {/* Tên sản phẩm: Chữ to, đậm, màu đen */}
        <Text className="text-xl font-bold text-gray-800 mb-2">
          iPhone 15 Pro Max
        </Text>

        {/* Giá bán: Chữ màu cam Shopee */}
        <Text className="text-lg font-bold text-orange-500 mb-4">
          29.990.000 ₫
        </Text>

        {/* Nút bấm: Nền cam, bo tròn, chữ trắng */}
        <TouchableOpacity className="bg-orange-500 py-3 rounded-full items-center active:bg-orange-600">
          <Text className="text-white font-bold text-base">
            Thêm vào giỏ
          </Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
=======
import "./global.css"
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
>>>>>>> cf074ac5efb8f0fcd4e34c597f7f27619512a433
    </View>
  );
}