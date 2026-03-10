import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

type UserData = {
  name: string;
  email: string;
};

interface ProfileScreenProps {
  userData: UserData;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userData, onLogout }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 bg-white">
        <Text className="flex-1 text-lg font-bold text-gray-900">
          Tài khoản
        </Text>
        <Icon name="person-circle-outline" size={28} color="#0056A4" />
      </View>

      <View className="p-4">
        <View className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm">
          <Text className="text-xs font-semibold text-gray-500 mb-1">
            Họ và tên
          </Text>
          <Text className="text-base font-semibold text-gray-900">
            {userData.name || "Khách hàng"}
          </Text>

          <View className="h-px bg-gray-100 my-3" />

          <Text className="text-xs font-semibold text-gray-500 mb-1">
            Email
          </Text>
          <Text className="text-sm text-gray-800">
            {userData.email || "Chưa cập nhật"}
          </Text>
        </View>

        <TouchableOpacity
          className="mt-4 bg-red-500 rounded-full py-3 items-center"
          onPress={onLogout}
        >
          <Text className="text-white font-semibold">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

