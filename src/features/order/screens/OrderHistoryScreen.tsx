import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MOCK_ORDERS = [
  { id: 'ORD001', date: '05/03/2026', total: '45.990.000đ', status: 'Đang giao', item: 'VGA ASUS RTX 4090' },
  { id: 'ORD002', date: '01/03/2026', total: '15.500.000đ', status: 'Đã giao', item: 'Intel Core i9-14900K' },
];

export default function OrderHistoryScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white p-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-gray-800 mr-6">Đơn hàng của tôi</Text>
      </View>

      <FlatList 
        data={MOCK_ORDERS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400 text-xs">Mã đơn: {item.id}</Text>
              <Text className="text-blue-600 font-bold text-xs">{item.status}</Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="cube-outline" size={30} color="#0056A4" />
              <View className="ml-3 flex-1">
                <Text className="font-bold text-gray-800">{item.item}</Text>
                <Text className="text-gray-500 text-xs">{item.date}</Text>
              </View>
              <Text className="font-bold text-red-500">{item.total}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}