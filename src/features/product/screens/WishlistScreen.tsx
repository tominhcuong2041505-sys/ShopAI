import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Dữ liệu giả lập sản phẩm yêu thích
const MOCK_WISHLIST = [
  { id: 'vga01', name: 'ASUS ROG Strix RTX 4090', price: '45.990.000đ', image: 'https://product.hstatic.net/1000333506/product/asus-rog-strix-rtx4090-24g-gaming-01_db14ea40771a4fbfad085487d4475753_grande.jpg', tag: 'VGA' },
  { id: 'cpu01', name: 'Intel Core i9-14900K', price: '15.500.000đ', image: 'https://m.media-amazon.com/images/I/51H9kH75SGL._AC_SL1200_.jpg', tag: 'CPU' },
];

export default function WishlistScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white p-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-gray-800 mr-6">Sản phẩm yêu thích</Text>
      </View>

      <FlatList
        data={MOCK_WISHLIST}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded-2xl mb-4 flex-row items-center border border-gray-100 shadow-sm">
            <Image source={{ uri: item.image }} className="w-20 h-20 rounded-xl" resizeMode="contain" />
            <View className="flex-1 ml-4">
              <Text className="text-[10px] text-blue-600 font-bold uppercase">{item.tag}</Text>
              <Text className="font-bold text-gray-800 text-sm" numberOfLines={1}>{item.name}</Text>
              <Text className="text-red-500 font-bold mt-1">{item.price}</Text>
            </View>
            <TouchableOpacity className="p-2">
              <Icon name="trash-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <Icon name="heart-dislike-outline" size={80} color="#d1d5db" />
            <Text className="text-gray-400 mt-4">Chưa có sản phẩm yêu thích nào</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}