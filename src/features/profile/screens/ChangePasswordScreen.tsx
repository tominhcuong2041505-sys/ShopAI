import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { changePassword, isLoading } = useAuthStore();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleChangePass = async () => {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (newPass !== confirmPass) {
      Alert.alert("Lỗi", "Mật khẩu mới không khớp");
      return;
    }

    try {
      await changePassword(oldPass, newPass);
      Alert.alert("Thành công", "Mật khẩu đã được thay đổi!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (err: any) {
      Alert.alert("Lỗi", err?.message || "Không thể đổi mật khẩu");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white p-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-gray-800 mr-6">Đổi mật khẩu</Text>
      </View>

      <View className="p-6">
        <View className="mb-4">
          <Text className="text-gray-600 mb-2 font-medium">Mật khẩu hiện tại</Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl" 
            secureTextEntry 
            placeholder="••••••••"
            value={oldPass} 
            onChangeText={setOldPass} 
          />
        </View>
        <View className="mb-4">
          <Text className="text-gray-600 mb-2 font-medium">Mật khẩu mới</Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl" 
            secureTextEntry 
            placeholder="••••••••"
            value={newPass} 
            onChangeText={setNewPass} 
          />
        </View>
        <View className="mb-8">
          <Text className="text-gray-600 mb-2 font-medium">Xác nhận mật khẩu mới</Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl" 
            secureTextEntry 
            placeholder="••••••••"
            value={confirmPass} 
            onChangeText={setConfirmPass} 
          />
        </View>

        <TouchableOpacity 
          className={`py-4 rounded-2xl shadow-md ${isLoading ? 'bg-gray-400' : 'bg-blue-700'} ${isLoading ? '' : 'active:bg-blue-800'}`}
          onPress={handleChangePass}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-bold text-lg">
            {isLoading ? 'ĐANG CẬP NHẬT...' : 'CẬP NHẬT MẬT KHẨU'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}