import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2; 

const PRODUCTS = [
  // CPU (5 sản phẩm)
  { id: 'cpu01', name: 'Intel Core i9-14900K', price: '15.500.000đ', tag: 'CPU', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7JayNc78UpCG1cmYGwbMhnyQWNJZNikqrJvA_2d9UEozJhNJBNul1ylfDpDmqVyhRaXvOascFl9T-DCTYiWydY2AqGggtWZbnJy28tc4nnJ0igMWzhrszOqVN8vjrICOLAE3d2ug&usqp=CAc' },
  { id: 'cpu02', name: 'Intel Core i7-14700K', price: '10.800.000đ', tag: 'CPU', image: 'https://m.media-amazon.com/images/I/51fS8H0M92L._AC_SL1000_.jpg' },
  { id: 'cpu03', name: 'Intel Core i5-13600K', price: '7.500.000đ', tag: 'CPU', image: 'https://m.media-amazon.com/images/I/51H9kH75SGL._AC_SL1200_.jpg' },
  { id: 'cpu04', name: 'Intel Core i3-12100F', price: '2.300.000đ', tag: 'CPU', image: 'https://m.media-amazon.com/images/I/51v81648Y7L._AC_SL1000_.jpg' },
  { id: 'cpu05', name: 'AMD Ryzen 9 7950X', price: '14.200.000đ', tag: 'CPU', image: 'https://m.media-amazon.com/images/I/6166O-S98gL._AC_SL1200_.jpg' },

  // MOBILE (10 sản phẩm)
  { id: 'ip15pm', name: 'iPhone 15 Pro Max 256GB', price: '29.990.000đ', tag: 'Mobile', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGOzRjLZUQXZkhZtVuksgM3CWXMc0wNreRFnNrloMEHN3imumHPtpR5yXSsDAVCvtCiwGJXdZEt8KZWiYOsL5Yjx6kh5bRt-pOmxR9HZoBNwOGzbOggdISlGE_dizFaQ3R5Jf1dQ&usqp=CAc' },
  { id: 's24u', name: 'Samsung Galaxy S24 Ultra', price: '26.500.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/71WjsZmiAuL._AC_SL1500_.jpg' },
  { id: 'ip14', name: 'iPhone 14 128GB Blue', price: '16.200.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg' },
  { id: 'zfold5', name: 'Galaxy Z Fold5 512GB', price: '32.000.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/716n8S38S9L._AC_SL1500_.jpg' },
  { id: 'mi14', name: 'Xiaomi 14 Ultra 5G', price: '24.900.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/61Nl-Hh2GHL._AC_SL1500_.jpg' },
  { id: 'op12', name: 'OnePlus 12 16GB RAM', price: '18.500.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/71S-O-v0-4L._AC_SL1500_.jpg' },
  { id: 'pixel8', name: 'Google Pixel 8 Pro', price: '21.000.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/71u969i8baL._AC_SL1500_.jpg' },
  { id: 'rog8', name: 'ROG Phone 8 Pro', price: '27.500.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/61Uax+8Z-ZL._AC_SL1500_.jpg' },
  { id: 'v29', name: 'Vivo V29 5G', price: '9.800.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/61O2O+6C6SL._AC_SL1200_.jpg' },
  { id: 're11', name: 'Oppo Reno11 Pro', price: '12.500.000đ', tag: 'Mobile', image: 'https://m.media-amazon.com/images/I/71-R5u7X9rL._AC_SL1500_.jpg' },

  // VGA (5 sản phẩm)
  { id: 'vga01', name: 'ASUS ROG Strix RTX 4090', price: '45.990.000đ', tag: 'VGA', image: 'https://product.hstatic.net/1000333506/product/asus-rog-strix-rtx4090-24g-gaming-01_db14ea40771a4fbfad085487d4475753_grande.jpg' },
  { id: 'vga02', name: 'MSI RTX 4080 Suprim X', price: '32.500.000đ', tag: 'VGA', image: 'https://m.media-amazon.com/images/I/81I-u8t9UHL._AC_SL1500_.jpg' },
  { id: 'vga03', name: 'Gigabyte RTX 4070 Ti', price: '22.800.000đ', tag: 'VGA', image: 'https://m.media-amazon.com/images/I/81xI7nLz6CL._AC_SL1500_.jpg' },
  { id: 'vga04', name: 'Zotac RTX 4060 8GB', price: '8.500.000đ', tag: 'VGA', image: 'https://m.media-amazon.com/images/I/71B6-C5pA3L._AC_SL1500_.jpg' },
  { id: 'vga05', name: 'Sapphire RX 7900 XTX', price: '28.900.000đ', tag: 'VGA', image: 'https://m.media-amazon.com/images/I/71-LzD-E0fL._AC_SL1500_.jpg' },

  // CASE, RAM, PSU (10 sản phẩm)
  { id: 'ram01', name: 'Corsair Vengeance RGB 32GB', price: '3.200.000đ', tag: 'RAM', image: 'https://m.media-amazon.com/images/I/719f-w-SFTL._AC_SL1500_.jpg' },
  { id: 'psu01', name: 'Corsair RM1000e Gold', price: '4.500.000đ', tag: 'PSU', image: 'https://m.media-amazon.com/images/I/71yL3Q6Xz-L._AC_SL1500_.jpg' },
  { id: 'case01', name: 'Lian Li O11 Dynamic EVO', price: '4.800.000đ', tag: 'CASE', image: 'https://m.media-amazon.com/images/I/71Z5-yG6RGL._AC_SL1500_.jpg' },
  { id: 'ram02', name: 'G.Skill Trident Z5 Neo', price: '3.800.000đ', tag: 'RAM', image: 'https://m.media-amazon.com/images/I/61Nl2S86YVL._AC_SL1500_.jpg' },
  { id: 'psu02', name: 'ASUS ROG Thor 1200W', price: '8.200.000đ', tag: 'PSU', image: 'https://m.media-amazon.com/images/I/81H+M0K0WpL._AC_SL1500_.jpg' },
  { id: 'case02', name: 'NZXT H9 Flow White', price: '4.200.000đ', tag: 'CASE', image: 'https://m.media-amazon.com/images/I/71G8N36rGcL._AC_SL1500_.jpg' },
  { id: 'ram03', name: 'Kingston Fury Renegade', price: '2.900.000đ', tag: 'RAM', image: 'https://m.media-amazon.com/images/I/61G7h5-mYLL._AC_SL1500_.jpg' },
  { id: 'psu03', name: 'Cooler Master MWE 750', price: '1.800.000đ', tag: 'PSU', image: 'https://m.media-amazon.com/images/I/71-v42G6W5L._AC_SL1500_.jpg' },
  { id: 'case03', name: 'Corsair 4000D Airflow', price: '2.500.000đ', tag: 'CASE', image: 'https://m.media-amazon.com/images/I/81T6p-v1m0L._AC_SL1500_.jpg' },
  { id: 'ssd01', name: 'Samsung 990 Pro 2TB', price: '4.900.000đ', tag: 'SSD', image: 'https://m.media-amazon.com/images/I/61M-F8pZtEL._AC_SL1500_.jpg' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  // Lọc sản phẩm theo tìm kiếm
  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* HEADER */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <View className="flex-1 bg-gray-100 flex-row items-center px-4 py-2 rounded-2xl">
          <Icon name="search-outline" size={20} color="#6b7280" />
          <TextInput 
            className="flex-1 ml-2 text-gray-800"
            placeholder="Tìm kiếm VGA, CPU, Mobile..."
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <TouchableOpacity className="ml-4">
          <Icon name="cart-outline" size={28} color="#0056A4" />
          <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 justify-center items-center border-2 border-white">
            <Text className="text-white text-[10px] font-bold">5</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BANNER */}
        <View className="mx-4 mt-4 shadow-lg bg-gray-100 rounded-3xl overflow-hidden">
          <Image 
            source={{ uri: 'https://bizweb.dktcdn.net/100/329/122/files/mmz-build-nnck-homepagebanner-870x433.jpg?v=1689244226023' }} 
            style={{ width: '100%', aspectRatio: 2 / 1 }}
            resizeMode="cover"
          />
        </View>

        {/* TIÊU ĐỀ PHẦN SẢN PHẨM */}
        <View className="px-4 pt-6 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-900">Danh sách sản phẩm</Text>
          <Text className="text-blue-600 font-medium">{filteredProducts.length} món</Text>
        </View>

        {/* LƯỚI SẢN PHẨM (30 MÓN) */}
        <View className="p-4 flex-row flex-wrap justify-between">
          {filteredProducts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => console.log("ID:", item.id)}
              style={{ width: ITEM_WIDTH }}
              className="bg-white mb-4 p-3 rounded-2xl border border-gray-100 shadow-sm"
            >
              <View className="w-full aspect-square bg-white justify-center items-center rounded-xl overflow-hidden mb-2">
                <Image 
                  source={{ uri: item.image }} 
                  style={{ width: '90%', height: '90%' }}
                  resizeMode="contain" 
                />
              </View>

              <Text className="text-[10px] text-blue-600 font-bold uppercase">{item.tag}</Text>
              <Text className="font-bold text-gray-800 h-10" numberOfLines={2}>{item.name}</Text>
              <Text className="text-red-500 font-bold mt-1 text-base">{item.price}</Text>
            </TouchableOpacity>
          ))}
          
          {/* Thông báo nếu không tìm thấy */}
          {filteredProducts.length === 0 && (
            <View className="w-full py-20 items-center">
              <Icon name="search-outline" size={60} color="#e5e7eb" />
              <Text className="text-gray-400 mt-4">Không tìm thấy linh kiện nào...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}