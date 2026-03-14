import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "@features/auth/store/useAuthStore";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  // Hút dữ liệu user từ Zustand (được lấy từ API)
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 bg-white">
        <Text className="flex-1 text-lg font-bold text-gray-900">
          Tài khoản
        </Text>
        <Icon name="person-circle-outline" size={28} color="#0056A4" />
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Thông tin User */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="text-xs font-semibold text-gray-500 mb-1">
            Họ và tên
          </Text>
          <Text className="text-base font-bold text-gray-900">
            {user?.fullName || "Đang tải..."}
          </Text>

          <View className="h-px bg-gray-100 my-3" />

          <Text className="text-xs font-semibold text-gray-500 mb-1">
            Số điện thoại
          </Text>
          <Text className="text-base font-bold text-gray-900">
            {user?.phone || "Đang tải..."}
          </Text>

          <View className="h-px bg-gray-100 my-3" />

          <Text className="text-xs font-semibold text-gray-500 mb-1">
            Email
          </Text>
          <Text className="text-sm text-gray-800">
            {user?.email || "Đang tải..."}
          </Text>
        </View>

        {/* Menu Chức năng */}
        <View className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden">
          <TouchableOpacity 
            className="flex-row items-center p-4 border-b border-gray-50"
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icon name="create-outline" size={22} color="#4b5563" />
            <Text className="flex-1 ml-3 text-sm font-semibold text-gray-800">Chỉnh sửa hồ sơ</Text>
            <Icon name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center p-4 border-b border-gray-50"
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Icon name="lock-closed-outline" size={22} color="#4b5563" />
            <Text className="flex-1 ml-3 text-sm font-semibold text-gray-800">Đổi mật khẩu</Text>
            <Icon name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center p-4 border-b border-gray-50"
            onPress={() => navigation.navigate("OrderHistory")}
          >
            <Icon name="cube-outline" size={22} color="#4b5563" />
            <Text className="flex-1 ml-3 text-sm font-semibold text-gray-800">Lịch sử đơn hàng</Text>
            <Icon name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center p-4"
            onPress={() => navigation.navigate("Address")}
          >
            <Icon name="location-outline" size={22} color="#4b5563" />
            <Text className="flex-1 ml-3 text-sm font-semibold text-gray-800">Địa chỉ giao hàng</Text>
            <Icon name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Đăng xuất */}
        <TouchableOpacity 
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row items-center justify-center mb-10"
          onPress={logout}
        >
          <Icon name="log-out-outline" size={22} color="#ef4444" />
          <Text className="ml-2 text-sm font-bold text-red-500">Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}