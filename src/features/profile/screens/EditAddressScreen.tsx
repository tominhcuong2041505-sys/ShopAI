import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAddressStore, Address } from '@features/profile/store/useAddressStore';

export default function EditAddressScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const existing: Address | undefined = route.params?.address;

  const addAddress = useAddressStore((s) => s.addAddress);
  const updateAddress = useAddressStore((s) => s.updateAddress);
  const deleteAddress = useAddressStore((s) => s.deleteAddress);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [detail, setDetail] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setPhone(existing.phone);
      setDetail(existing.detail);
      setIsDefault(existing.isDefault);
    }
  }, [existing]);

  const handleSave = () => {
    if (!name.trim() || !phone.trim() || !detail.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (existing) {
      updateAddress(existing.id, { name: name.trim(), phone: phone.trim(), detail: detail.trim(), isDefault });
    } else {
      addAddress({ name: name.trim(), phone: phone.trim(), detail: detail.trim(), isDefault });
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!existing) return;
    Alert.alert(
      'Xóa địa chỉ',
      'Bạn có chắc muốn xóa địa chỉ này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => {
            deleteAddress(existing.id);
            navigation.goBack();
          } },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-gray-800 mr-6">
          {existing ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
        </Text>
        {existing && (
          <TouchableOpacity onPress={handleDelete}>
            <Icon name="trash-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>

      <View className="p-6">
        <Text className="text-sm font-bold text-gray-600 mb-1">Tên người nhận</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mb-4 text-gray-800"
          value={name}
          onChangeText={setName}
        />

        <Text className="text-sm font-bold text-gray-600 mb-1">Số điện thoại</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mb-4 text-gray-800"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text className="text-sm font-bold text-gray-600 mb-1">Địa chỉ chi tiết</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mb-4 text-gray-800"
          value={detail}
          onChangeText={setDetail}
          multiline
        />

        <View className="flex-row items-center mb-8">
          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            thumbColor={isDefault ? '#2563eb' : '#f3f4f6'}
          />
          <Text className="ml-3 text-gray-700">Đặt làm địa chỉ mặc định</Text>
        </View>

        <TouchableOpacity
          className="bg-blue-700 py-4 rounded-2xl shadow-md"
          onPress={handleSave}
        >
          <Text className="text-white text-center font-bold text-lg">
            LƯU ĐỊA CHỈ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
