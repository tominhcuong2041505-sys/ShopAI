import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useCartStore } from "@features/cart/store/useCartStore";

const CartScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { items: cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  const isEmpty = !cart || cart.length === 0;

  // ĐÃ FIX: Ép kiểu rõ ràng (sum: number, item: any) để hết lỗi 'unknown'
  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.reduce((sum: number, item: any) => sum + (Number(item.price) * item.quantity), 0);
  };

  const formatCurrency = (value: number | string) => {
    const numericValue = Number(value);
    if (!numericValue || isNaN(numericValue)) return "0đ";
    return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const total = calculateTotal();

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center px-6">
      <Icon name="cart-outline" size={80} color="#d1d5db" />
      <Text className="mt-4 text-base font-semibold text-gray-700">Giỏ hàng của bạn đang trống</Text>
      <Text className="mt-1 text-xs text-gray-500 text-center">Hãy chọn thêm các sản phẩm yêu thích nhé.</Text>
      <TouchableOpacity
        className="mt-6 px-6 py-3 rounded-full bg-blue-600 shadow-sm"
        onPress={() => navigation.navigate("HomeMain")}
      >
        <Text className="text-white font-bold text-sm">Tiếp tục mua sắm</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row bg-white px-4 py-3 mb-2 shadow-sm rounded-lg mx-2 mt-2">
      <View className="w-20 h-20 rounded-lg mr-3 bg-gray-50 justify-center items-center">
        <Image source={{ uri: item.image }} className="w-[90%] h-[90%]" resizeMode="contain" />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-900" numberOfLines={2}>{item.name}</Text>
        {item.selectedColor && (
          <Text className="text-xs text-gray-500 mt-1">Phân loại: {item.selectedColor}</Text>
        )}
        <Text className="text-sm font-bold text-blue-700 mt-1">{formatCurrency(item.price)}</Text>
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center border border-gray-300 rounded-full bg-gray-50">
            <TouchableOpacity className="px-3 py-1" onPress={() => decreaseQuantity(item.id, item.selectedColor)}>
              <Text className="text-lg text-gray-600 font-bold">-</Text>
            </TouchableOpacity>
            <Text className="px-3 text-sm font-bold text-gray-800">{item.quantity}</Text>
            <TouchableOpacity className="px-3 py-1" onPress={() => increaseQuantity(item.id, item.selectedColor)}>
              <Text className="text-lg text-gray-600 font-bold">+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="p-2" onPress={() => removeFromCart(item.id, item.selectedColor)}>
            <Icon name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <TouchableOpacity className="mr-3 p-1 -ml-1" onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-lg font-bold text-gray-900">Giỏ hàng</Text>
        <Text className="text-sm font-bold text-blue-600">{cart?.length || 0} sản phẩm</Text>
      </View>

      {isEmpty ? renderEmpty() : (
        <FlatList
          data={cart}
          keyExtractor={(item: any) => `${item.id}-${item.selectedColor}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {!isEmpty && (
        <View className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-bold text-gray-600">Tổng thanh toán:</Text>
            <Text className="text-xl font-bold text-red-500">{formatCurrency(total)}</Text>
          </View>
          <TouchableOpacity
            className="w-full rounded-2xl bg-orange-500 py-4 items-center shadow-md"
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text className="text-white font-bold text-base uppercase tracking-wider">Tiến hành đặt hàng</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;