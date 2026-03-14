import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Gọi hàm login từ Két sắt Zustand
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập tài khoản và mật khẩu");
      return;
    }

    try {
      await login(email, password);
      Alert.alert("Thành công", "Đăng nhập thành công!");
    } catch (err: any) {
      Alert.alert("Lỗi", err.message || "Không thể đăng nhập");
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold text-center mb-8">ĐĂNG NHẬP</Text>
      
      <TextInput 
        className="bg-gray-100 p-4 rounded-xl mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <View className="relative">
        <TextInput 
          className="bg-gray-100 p-4 pr-14 rounded-xl mb-6" // padding-right to make room for toggle
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-5 z-10"
        >
          <Text className="text-blue-600 font-bold text-xs">
            {showPassword ? 'ẨN' : 'HIỆN'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-blue-600 py-4 rounded-xl" onPress={handleLogin}>
        <Text className="text-white text-center font-bold">ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-6" onPress={() => navigation.navigate('Register')}>
        <Text className="text-center text-blue-600">Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
}