import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.9}
      className="w-[48%] bg-white rounded-lg shadow-sm mb-4 overflow-hidden border border-gray-100"
    >
      <View className="relative">
        <Image 
          source={{ uri: product.images[0] }} 
          className="w-full h-44 bg-gray-200"
          resizeMode="cover"
        />
        {/* Badge */}
        <View className="absolute top-0 right-0 bg-yellow-400 px-1 py-0.5">
            <Text className="text-[10px] font-bold text-red-600">Xin chào</Text>
        </View>
        <View className="absolute bottom-0 left-0 bg-transparent">
             {/* Overlay frame if needed */}
        </View>
      </View>

      <View className="p-2">
        <Text numberOfLines={2} className="text-xs text-textMain leading-4 mb-2 min-h-[32px]">
          {product.name}
        </Text>
        
        <View className="flex-row items-center mb-1">
          {product.badges.map((badge, idx) => (
             <View key={idx} className="border border-primary px-0.5 mr-1 rounded-[2px]">
                <Text className="text-[9px] text-primary">{badge}</Text>
             </View>
          ))}
        </View>

        <View className="flex-row items-baseline justify-between mt-1">
          <View className="flex-row items-baseline">
            <Text className="text-xs text-primary font-medium underline">đ</Text>
            <Text className="text-base font-bold text-primary ml-0.5">
                {product.price.toLocaleString('vi-VN')}
            </Text>
          </View>
          <Text className="text-[10px] text-textSub">Đã bán {product.soldCount / 1000}k</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};