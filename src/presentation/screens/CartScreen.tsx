import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../navigation/types";
import { useCartStore } from "../../store/useCartStore";

type Navigation = RootStackNavigationProp;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  const isEmpty = cart.length === 0;

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const numericPrice = Number(
        item.price.replace(/[^\d]/g, "")
      );
      if (Number.isNaN(numericPrice)) return sum;
      return sum + numericPrice * item.quantity;
    }, 0);
  };

  const formatCurrency = (value: number) => {
    if (!value) return "0đ";
    return (
      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    );
  };

  const total = calculateTotal();

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center px-6">
      <Icon name="cart-outline" size={80} color="#d1d5db" />
      <Text className="mt-4 text-base font-semibold text-gray-700">
        Giỏ hàng của bạn đang trống
      </Text>
      <Text className="mt-1 text-xs text-gray-500 text-center">
        Hãy chọn thêm các sản phẩm yêu thích để mua sắm nhé.
      </Text>
      <TouchableOpacity
        className="mt-6 px-6 py-3 rounded-full bg-blue-600"
        onPress={() => navigation.navigate("MainTabs")}
      >
        <Text className="text-white font-semibold text-sm">
          Tiếp tục mua sắm
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: any) => (
    <View className="flex-row bg-white px-4 py-3 mb-2">
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-lg mr-3"
        resizeMode="contain"
      />
      <View className="flex-1">
        <Text
          className="text-sm font-semibold text-gray-900"
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          Màu: {item.selectedColor}
        </Text>
        <Text className="text-sm font-bold text-blue-700 mt-1">
          {item.price}
        </Text>
        <View className="flex-row items-center mt-2">
          <View className="flex-row items-center border border-gray-300 rounded-full">
            <TouchableOpacity
              className="px-3 py-1"
              onPress={() => decreaseQuantity(item.id, item.selectedColor)}
            >
              <Text className="text-lg text-gray-600">-</Text>
            </TouchableOpacity>
            <Text className="px-3 text-sm font-semibold text-gray-800">
              {item.quantity}
            </Text>
            <TouchableOpacity
              className="px-3 py-1"
              onPress={() => increaseQuantity(item.id, item.selectedColor)}
            >
              <Text className="text-lg text-gray-600">+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="ml-4"
            onPress={() =>
              removeFromCart(item.id, item.selectedColor)
            }
          >
            <Icon name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity
          className="mr-3"
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-lg font-bold text-gray-900">
          Giỏ hàng
        </Text>
        <Text className="text-xs text-gray-500">
          {cart.length} sản phẩm
        </Text>
      </View>

      {isEmpty ? (
        renderEmpty()
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => `${item.id}-${item.selectedColor}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}

      {!isEmpty && (
        <View className="border-t border-gray-200 bg-white px-4 py-3">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-gray-600">Tổng tiền</Text>
            <Text className="text-lg font-bold text-red-500">
              {formatCurrency(total)}
            </Text>
          </View>
          <TouchableOpacity
            className="mt-1 w-full rounded-full bg-orange-500 py-3 items-center"
            onPress={() => {
              if (cart.length === 0) {
                Alert.alert(
                  "Thông báo",
                  "Giỏ hàng trống, hãy thêm sản phẩm trước khi thanh toán."
                );
                return;
              }
              navigation.navigate("Checkout");
            }}
          >
            <Text className="text-white font-semibold text-sm">
              Thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

