import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen({ userData, onLogout }: any) {
  const navigation = useNavigation<any>();

  // Component phụ cho các trạng thái đơn hàng (Chờ thanh toán, Đang giao...)
  const OrderState = ({ icon, label, badge, onPress }: any) => (
    <TouchableOpacity className="items-center relative" onPress={onPress}>
      <Icon name={icon} size={26} color="#4b5563" />
      <Text className="text-[9px] text-gray-500 mt-1">{label}</Text>
      {badge && (
        <View className="absolute -top-1 -right-1 bg-blue-600 rounded-full w-4 h-4 justify-center items-center">
          <Text className="text-white text-[8px] font-bold">{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Component cho các mục Menu danh sách
  const MenuItem = ({ icon, title, badge = null, color = "#4b5563", onPress }: any) => (
    <TouchableOpacity 
      className="flex-row items-center p-4 bg-white border-b border-gray-50 active:bg-gray-100"
      onPress={onPress}
    >
      <Icon name={icon} size={22} color={color} />
      <Text className="flex-1 ml-4 text-gray-700 font-medium">{title}</Text>
      {badge && (
        <View className="bg-red-500 px-2 py-0.5 rounded-full mr-2">
          <Text className="text-white text-[10px] font-bold">{badge}</Text>
        </View>
      )}
      <Icon name="chevron-forward" size={18} color="#d1d5db" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER: Thông tin cá nhân */}
        <View className="bg-blue-700 pt-10 pb-20 px-6 items-center rounded-b-[40px] shadow-lg">
          <View className="w-24 h-24 rounded-full border-4 border-white/30 bg-blue-500 justify-center items-center">
            <Text className="text-white text-3xl font-bold">
              {userData.name ? userData.name.substring(0, 2) : 'CU'}
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold mt-3">{userData.name || 'CUONG'}</Text>
          <Text className="text-blue-100 text-sm">{userData.email || 'cuong@gmail.com'}</Text>
        </View>

        {/* PHẦN ĐƠN HÀNG: Đã liên kết OrderHistory */}
        <View className="mt-6 mx-4 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-50">
            <Text className="font-bold text-gray-800">Đơn hàng của tôi</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
              <Text className="text-blue-600 text-xs font-bold">Xem lịch sử {'>'}</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-around py-4">
            <OrderState icon="wallet-outline" label="Chờ t.toán" onPress={() => navigation.navigate('OrderHistory')} />
            <OrderState icon="cube-outline" label="Chờ lấy hàng" badge="2" onPress={() => navigation.navigate('OrderHistory')} />
            <OrderState icon="bus-outline" label="Đang giao" onPress={() => navigation.navigate('OrderHistory')} />
            <OrderState icon="star-outline" label="Đánh giá" onPress={() => navigation.navigate('OrderHistory')} />
          </View>
        </View>

        {/* TIỆN ÍCH: Đã liên kết EditProfile */}
        <View className="mt-4 mx-4 bg-white rounded-3xl shadow-sm overflow-hidden">
          <MenuItem 
            icon="person-outline" 
            title="Thiết lập tài khoản" 
            onPress={() => navigation.navigate('EditProfile', { user: userData })}
          />
          <MenuItem icon="location-outline" title="Địa chỉ nhận hàng" />
          <MenuItem icon="card-outline" title="Liên kết ngân hàng" />
        </View>

        {/* ĐĂNG XUẤT */}
        <TouchableOpacity 
          className="m-8 flex-row justify-center items-center py-4 bg-red-50 rounded-2xl border border-red-100"
          onPress={onLogout}
        >
          <Icon name="log-out-outline" size={20} color="#dc2626" />
          <Text className="ml-2 text-red-600 font-bold">Đăng xuất</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}