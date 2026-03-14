import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Import chuẩn theo cấu trúc dự án của bạn
import { useCartStore } from "@features/cart/store/useCartStore";
import { useAddressStore, Address } from "@features/profile/store/useAddressStore";
import { useAuthStore } from "@features/auth/store/useAuthStore";

type PaymentMethod = "cod" | "bank";

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { items: cart, clearCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();

  // address dropdown state (for logged in user)
  const addresses = useAddressStore((s) => s.addresses);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressList, setShowAddressList] = useState(false);

  // guest info when not logged in
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestDetail, setGuestDetail] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  // if address list changes, ensure we always have something selected
  useEffect(() => {
    if (!isLoggedIn) return;
    if (addresses.length === 0) {
      setSelectedAddress(null);
      return;
    }
    // if current selected is removed or null, choose default or first
    const exists = selectedAddress && addresses.find((a) => a.id === selectedAddress.id);
    if (!exists) {
      const def = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddress(def);
    }
  }, [addresses, isLoggedIn]);

  // clear guest fields when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setGuestName('');
      setGuestPhone('');
      setGuestDetail('');
    }
  }, [isLoggedIn]);

  // show a gentle reminder if guest tries to access
  useEffect(() => {
    if (!isLoggedIn) {
      Alert.alert(
        'Chưa đăng nhập',
        'Bạn có thể tiếp tục với tư cách khách hoặc đăng nhập để đồng bộ thông tin.',
        [
          { text: 'Tôi hiểu', style: 'cancel' },
          { text: 'Đăng nhập', onPress: () => navigation.navigate('Login') },
        ]
      );
    }
  }, []);

  // ĐÃ SỬA: Thêm "item: any" và "Number(item.price)" để trị dứt điểm lỗi TypeScript
  const calcSubtotal = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((sum: number, item: any) => sum + Number(item.price) * item.quantity, 0);
  };

  // ĐÃ SỬA: Nhận cả number | string và ép về số an toàn
  const formatCurrency = (value: number | string) => {
    const numericValue = Number(value);
    if (!numericValue || isNaN(numericValue)) return "0đ";
    return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const shippingFee = 30000;
  const subtotal = calcSubtotal();
  const total = subtotal + (cart && cart.length > 0 ? shippingFee : 0);

  const handlePlaceOrder = () => {
    if (isLoggedIn) {
      if (!selectedAddress) {
        Alert.alert(
          "Thiếu thông tin",
          "Vui lòng chọn địa chỉ giao hàng."
        );
        return;
      }
    } else {
      if (!guestName || !guestPhone || !guestDetail) {
        Alert.alert(
          "Thiếu thông tin",
          "Vui lòng nhập đầy đủ họ tên, điện thoại và địa chỉ."
        );
        return;
      }
    }

    Alert.alert("Đặt hàng thành công", "Cảm ơn bạn đã mua sắm tại ShopAI!", [
      {
        text: "OK",
        onPress: () => {
          clearCart(); // Xóa sạch giỏ hàng sau khi đặt thành công
          navigation.navigate("HomeMain"); // Trở về trang chủ
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
        {/* HEADER */}
        <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
          <TouchableOpacity
            className="mr-3 p-1 -ml-1"
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="flex-1 text-lg font-bold text-gray-900">
            Thanh toán
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Section 1 - Thông tin giao hàng */}
          <View className="bg-white px-4 py-4 mb-3">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Thông tin giao hàng
            </Text>
            {!isLoggedIn && (
              <Text className="text-sm text-red-500 mb-2">
                Bạn đang xem ở chế độ khách, thông tin không được lưu khi thoát.
              </Text>
            )}

            {/* address picker or guest form */}
          {isLoggedIn ? (
            <>
              {/* address picker */}
              <TouchableOpacity
                className="border border-gray-300 rounded-lg px-3 py-2 mb-2 flex-row justify-between items-center bg-white"
                onPress={() => setShowAddressList((p) => !p)}
              >
                <View className="flex-1">
                  {selectedAddress ? (
                    <View>
                      <Text className="text-sm text-gray-900">
                        {selectedAddress.name} — {selectedAddress.phone}
                      </Text>
                      <Text className="text-xs text-gray-700">
                        {selectedAddress.detail}
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-sm text-gray-400">
                      Chưa chọn địa chỉ
                    </Text>
                  )}
                </View>
                <Icon
                  name={showAddressList ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#6b7280"
                />
              </TouchableOpacity>
              {showAddressList && (
                <View className="bg-white border border-gray-300 rounded-lg mb-3">
                  {addresses.map((a) => (
                    <TouchableOpacity
                      key={a.id}
                      className="px-3 py-2 border-b border-gray-100"
                      onPress={() => {
                        setSelectedAddress(a);
                        setShowAddressList(false);
                      }}
                    >
                      <Text className="text-sm text-gray-800" numberOfLines={1}>
                        {a.detail}
                      </Text>
                      <Text className="text-xs text-gray-500">{a.phone}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    className="px-3 py-2"
                    onPress={() => {
                      setShowAddressList(false);
                      navigation.navigate('Address');
                    }}
                  >
                    <Text className="text-blue-600 text-sm font-bold">
                      Quản lý địa chỉ
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
              <>
                <Text className="text-sm font-semibold text-gray-900 mb-2">
                  Nhập thông tin giao hàng
                </Text>
                <TextInput
                  placeholder="Họ và tên"
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
                  value={guestName}
                  onChangeText={setGuestName}
                />
                <TextInput
                  placeholder="Số điện thoại"
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
                  keyboardType="phone-pad"
                  value={guestPhone}
                  onChangeText={setGuestPhone}
                />
                <TextInput
                  placeholder="Địa chỉ"
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
                  value={guestDetail}
                  onChangeText={setGuestDetail}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text className="text-blue-600 text-sm">
                    Đăng nhập để lưu và đồng bộ thông tin
                  </Text>
                </TouchableOpacity>
              </>
          )}
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
          <View className="bg-white px-4 py-4 mt-3 shadow-sm">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Tóm tắt đơn hàng
            </Text>

            {/* ĐÃ SỬA: Thêm item: any để sửa lỗi 'never' */}
            {cart && cart.map((item: any) => (
              <View
                key={`${item.id}-${item.selectedColor}`}
                className="flex-row items-center mb-2"
              >
                <Text
                  className="flex-1 text-xs text-gray-800 pr-2"
                  numberOfLines={2}
                >
                  {item.name}{" "}
                  {item.selectedColor && item.selectedColor !== "Mặc định" && (
                    <Text className="text-gray-500">
                      ({item.selectedColor})
                    </Text>
                  )}
                </Text>
                <Text className="text-xs text-gray-700 mr-2 font-medium">
                  x{item.quantity}
                </Text>
                <Text className="text-xs font-semibold text-gray-900">
                  {formatCurrency(item.price)}
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
                {cart && cart.length > 0 ? formatCurrency(shippingFee) : "0đ"}
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
        <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-4 shadow-lg">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs text-gray-500">Tổng thanh toán</Text>
              <Text className="text-xl font-bold text-red-500">
                {formatCurrency(total)}
              </Text>
            </View>
            <TouchableOpacity
              className="flex-1 ml-6 rounded-2xl bg-blue-600 py-3.5 items-center shadow-md"
              onPress={handlePlaceOrder}
            >
              <Text className="text-white font-bold text-base uppercase tracking-wider">
                ĐẶT HÀNG
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;