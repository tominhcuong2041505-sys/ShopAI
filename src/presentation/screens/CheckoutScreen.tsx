import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../navigation/types";
import { useCartStore } from "../../store/useCartStore";

type Navigation = RootStackNavigationProp;

type PaymentMethod = "cod" | "bank";

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const { cart, clearCart } = useCartStore();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");

  const calcSubtotal = () =>
    cart.reduce((sum, item) => {
      const numericPrice = Number(
        item.price.replace(/[^\d]/g, "")
      );
      if (Number.isNaN(numericPrice)) return sum;
      return sum + numericPrice * item.quantity;
    }, 0);

  const formatCurrency = (value: number) =>
    value
      ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
      : "0đ";

  const shippingFee = 30000;
  const subtotal = calcSubtotal();
  const total = subtotal + (cart.length > 0 ? shippingFee : 0);

  const handlePlaceOrder = () => {
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      Alert.alert(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng."
      );
      return;
    }

    Alert.alert("Đặt hàng thành công", "Cảm ơn bạn đã mua sắm tại ShopAI!", [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          navigation.navigate("MainTabs");
        },
      },
    ]);
  };

  const renderPaymentOption = (
    value: PaymentMethod,
    label: string,
    description: string,
    icon: string
  ) => {
    const isSelected = paymentMethod === value;
    return (
      <TouchableOpacity
        className="flex-row items-center px-4 py-3 mb-2 rounded-xl border bg-white"
        style={{
          borderColor: isSelected ? "#2563eb" : "#e5e7eb",
        }}
        onPress={() => setPaymentMethod(value)}
      >
        <View
          className={`w-9 h-9 rounded-full items-center justify-center mr-3 ${
            isSelected ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          <Icon
            name={icon}
            size={20}
            color={isSelected ? "#2563eb" : "#6b7280"}
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-900">
            {label}
          </Text>
          <Text className="text-[11px] text-gray-500 mt-0.5">
            {description}
          </Text>
        </View>
        <View
          className={`w-5 h-5 rounded-full border items-center justify-center ${
            isSelected ? "border-blue-600" : "border-gray-400"
          }`}
        >
          {isSelected && (
            <View className="w-3 h-3 bg-blue-600 rounded-full" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
          <TouchableOpacity
            className="mr-3"
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="flex-1 text-lg font-bold text-gray-900">
            Thanh toán
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Section 1 - Thông tin giao hàng */}
          <View className="bg-white px-4 py-4 mb-3">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Thông tin giao hàng
            </Text>

            <Text className="text-xs font-semibold text-gray-500 mb-1">
              Họ và tên
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 mb-3"
              placeholder="Nhập họ tên người nhận"
              value={fullName}
              onChangeText={setFullName}
            />

            <Text className="text-xs font-semibold text-gray-500 mb-1">
              Số điện thoại
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 mb-3"
              placeholder="VD: 0901 234 567"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text className="text-xs font-semibold text-gray-500 mb-1">
              Địa chỉ giao hàng
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Section 2 - Phương thức thanh toán */}
          <View className="px-4 py-3">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Phương thức thanh toán
            </Text>
            {renderPaymentOption(
              "cod",
              "Thanh toán khi nhận hàng (COD)",
              "Thanh toán trực tiếp cho nhân viên giao hàng.",
              "wallet-outline"
            )}
            {renderPaymentOption(
              "bank",
              "Chuyển khoản (VNPay / Momo)",
              "Quét mã QR hoặc thanh toán qua ví điện tử, ngân hàng.",
              "card-outline"
            )}
          </View>

          {/* Section 3 - Tóm tắt đơn hàng */}
          <View className="bg-white px-4 py-4 mt-3">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Tóm tắt đơn hàng
            </Text>

            {cart.map((item) => (
              <View
                key={`${item.id}-${item.selectedColor}`}
                className="flex-row items-center mb-2"
              >
                <Text
                  className="flex-1 text-xs text-gray-800"
                  numberOfLines={2}
                >
                  {item.name}{" "}
                  <Text className="text-gray-500">
                    ({item.selectedColor})
                  </Text>
                </Text>
                <Text className="text-xs text-gray-700 mr-2">
                  x{item.quantity}
                </Text>
                <Text className="text-xs font-semibold text-gray-900">
                  {item.price}
                </Text>
              </View>
            ))}

            <View className="h-px bg-gray-100 my-3" />

            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-gray-600">Tạm tính</Text>
              <Text className="text-xs font-semibold text-gray-900">
                {formatCurrency(subtotal)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-gray-600">Phí vận chuyển</Text>
              <Text className="text-xs font-semibold text-gray-900">
                {cart.length > 0 ? formatCurrency(shippingFee) : "0đ"}
              </Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-sm font-semibold text-gray-900">
                Tổng cộng
              </Text>
              <Text className="text-base font-bold text-red-500">
                {formatCurrency(total)}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Sticky bottom bar */}
        <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3">
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-xs text-gray-500">Tổng cộng</Text>
              <Text className="text-lg font-bold text-red-500">
                {formatCurrency(total)}
              </Text>
            </View>
            <TouchableOpacity
              className="flex-1 ml-4 rounded-full bg-blue-600 py-3 items-center"
              onPress={handlePlaceOrder}
            >
              <Text className="text-white font-semibold text-sm">
                Đặt hàng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

