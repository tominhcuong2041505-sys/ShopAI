import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAddressStore, Address } from '@features/profile/store/useAddressStore';

// dữ liệu mẫu đã chuyển vào store nên không cần nữa

export default function AddressScreen() {
  const navigation = useNavigation<any>();

  const addresses = useAddressStore((s) => s.addresses);
  const deleteAddress = useAddressStore((s) => s.deleteAddress);
  const setDefault = useAddressStore((s) => s.setDefault);

  const handleAddNew = () => {
    navigation.navigate('EditAddress');
  };

  const handleEdit = (item: Address) => {
    navigation.navigate('EditAddress', { address: item });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Xóa địa chỉ',
      'Bạn có chắc muốn xóa địa chỉ này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => deleteAddress(id) }
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setDefault(id);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white p-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-gray-800 mr-6">Địa chỉ nhận hàng</Text>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center mt-20">
            <Text className="text-gray-500">Chưa có địa chỉ nào. Vui lòng thêm.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-2xl mb-4 border border-gray-100 shadow-sm">
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <Text className="font-bold text-gray-900 text-base">{item.name}</Text>
                {item.isDefault && (
                  <View className="bg-blue-100 px-2 py-0.5 rounded ml-2">
                    <Text className="text-blue-700 text-[10px] font-bold">Mặc định</Text>
                  </View>
                )}
              </View>
              <View className="flex-row items-center">
                {!item.isDefault && (
                  <TouchableOpacity onPress={() => handleSetDefault(item.id)} className="mr-3">
                    <Text className="text-sm text-gray-500">Đặt mặc định</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => handleEdit(item)} className="mr-3">
                  <Text className="text-blue-600 text-sm font-bold">Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Icon name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-gray-600 text-sm mb-1">{item.phone}</Text>
            <Text className="text-gray-500 text-sm leading-5">{item.detail}</Text>
          </View>
        )}
      />

      <View className="p-4 bg-white border-t border-gray-100">
        <TouchableOpacity 
          className="bg-blue-700 py-4 rounded-2xl flex-row justify-center items-center active:bg-blue-800"
          onPress={handleAddNew}
        >
          <Icon name="add-circle-outline" size={20} color="white" />
          <Text className="text-white font-bold ml-2">THÊM ĐỊA CHỈ MỚI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}