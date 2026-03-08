import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation, onLoginSuccess }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      // Tách lấy phần tên trước dấu @ và viết hoa
      const userName = email.split('@')[0].toUpperCase();
      
      Alert.alert("Thành công", `Chào mừng ${userName} quay trở lại!`, [
        { 
          text: "OK", 
          onPress: () => onLoginSuccess(userName, email) // Gọi hàm để đổi trạng thái sang Profile
        }
      ]);
    } else {
      Alert.alert("Lỗi", "Vui lòng nhập tài khoản và mật khẩu");
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
      
      <TextInput 
        className="bg-gray-100 p-4 rounded-xl mb-6"
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity className="bg-blue-600 py-4 rounded-xl" onPress={handleLogin}>
        <Text className="text-white text-center font-bold">ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-6" onPress={() => navigation.navigate('Register')}>
        <Text className="text-center text-gray-500">
          Chưa có tài khoản? <Text className="text-blue-600 font-bold">Đăng ký ngay</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}