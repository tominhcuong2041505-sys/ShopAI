import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen({ route }: any) {
  const navigation = useNavigation();
  const { user } = route.params || { user: { name: 'CUONG', email: 'cuong@gmail.com' } };

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState('0912345678'); // Giả lập dữ liệu cũ

  const handleSave = () => {
    Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật!");
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header tùy chỉnh */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-gray-800 mr-6">Chỉnh sửa hồ sơ</Text>
      </View>

      <ScrollView className="p-6">
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-blue-100 justify-center items-center">
            <Icon name="person" size={50} color="#0056A4" />
          </View>
          <TouchableOpacity className="mt-2">
            <Text className="text-blue-600 font-medium">Thay đổi ảnh đại diện</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-5">
          <Text className="text-sm font-bold text-gray-600 mb-2">Họ và tên</Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-gray-800"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm font-bold text-gray-600 mb-2">Số điện thoại</Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-gray-800"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View className="mb-8">
          <Text className="text-sm font-bold text-gray-600 mb-2">Email (Không thể thay đổi)</Text>
          <TextInput 
            className="bg-gray-100 border border-gray-200 p-4 rounded-2xl text-gray-400"
            value={user.email}
            editable={false}
          />
        </View>

        <TouchableOpacity 
          className="bg-blue-700 py-4 rounded-2xl shadow-md"
          onPress={handleSave}
        >
          <Text className="text-white text-center font-bold text-lg">LƯU THAY ĐỔI</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}