import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { MOCK_PRODUCT } from '../data/mockData';
import { ImageGallery } from '../components/ImageGallery';
import { ProductVariant } from '../types';
import { useCart } from '../context/CartContext.tsx';
import Animated, { Layout } from 'react-native-reanimated';

interface ProductDetailScreenProps {
  onClose: () => void;
}

export const ProductDetailScreen = ({ onClose }: ProductDetailScreenProps) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addToCartButtonRef = useRef<View>(null);

  const product = MOCK_PRODUCT;

  // Calculate dynamic price
  const currentPrice = selectedColor && selectedColor.price ? selectedColor.price : product.price;

  const handleAddToCart = () => {
     if (!selectedColor || !selectedSize) {
         Alert.alert('Thông báo', 'Vui lòng chọn màu sắc và kích thước');
         return;
     }

     addToCartButtonRef.current?.measureInWindow((x, y, width, height) => {
        addToCart({
            productId: product.id,
            variantId: selectedColor.id,
            size: selectedSize,
            quantity,
            price: currentPrice
        }, { x: x + width / 2, y: y + height / 2 });
     });
  };

  return (
    <View className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        {/* Header Overlay */}
        <View className="absolute top-0 left-0 right-0 z-50 flex-row justify-between p-4 pt-12">
            <TouchableOpacity onPress={onClose} className="bg-black/30 p-2 rounded-full">
                <Text className="text-white font-bold">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-black/30 p-2 rounded-full">
                <Text className="text-white font-bold">Share</Text>
            </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 pb-20">
            {/* Gallery */}
            <ImageGallery images={product.images} />

            {/* Price & Title Info */}
            <View className="bg-white p-4 mb-2">
                <View className="flex-row items-baseline">
                    <Text className="text-primary text-sm underline font-bold">đ</Text>
                    <Text className="text-primary text-2xl font-bold ml-1">{currentPrice.toLocaleString('vi-VN')}</Text>
                    <Text className="text-gray-400 text-sm line-through ml-2">đ{product.originalPrice.toLocaleString('vi-VN')}</Text>
                </View>
                
                <Text className="text-textMain text-base font-medium mt-2 leading-5">{product.name}</Text>
                
                <View className="flex-row items-center mt-3 justify-between">
                    <View className="flex-row items-center">
                        <View className="flex-row">
                            {[1,2,3,4,5].map(i => (
                                <Text key={i} className="text-yellow-400 text-xs">★</Text>
                            ))}
                        </View>
                        <Text className="text-xs text-textMain ml-1 border-r border-gray-300 pr-2 mr-2">4.9</Text>
                        <Text className="text-xs text-textMain">Đã bán 1.2k</Text>
                    </View>
                    <View className="flex-row space-x-2">
                        <Text className="text-xs text-gray-500">❤️</Text>
                    </View>
                </View>
            </View>

            {/* Variants */}
            <View className="bg-white p-4 mb-2">
                <Text className="text-sm font-bold text-textMain mb-3">Màu Sắc</Text>
                <View className="flex-row flex-wrap">
                    {product.variants.colors.map(color => {
                        const isSelected = selectedColor?.id === color.id;
                        const isOutOfStock = color.stock === 0;
                        return (
                            <TouchableOpacity 
                                key={color.id}
                                disabled={isOutOfStock}
                                onPress={() => setSelectedColor(color)}
                                className={`flex-row items-center p-1 border rounded mr-3 mb-3 ${isSelected ? 'border-primary bg-orange-50' : 'border-gray-200'} ${isOutOfStock ? 'opacity-40' : ''}`}
                            >
                                <Image source={{ uri: color.image }} className="w-8 h-8 rounded mr-2 bg-gray-200" />
                                <Text className={`text-sm pr-2 ${isSelected ? 'text-primary' : 'text-textMain'}`}>{color.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text className="text-sm font-bold text-textMain mb-3 mt-2">Kích Thước</Text>
                <View className="flex-row flex-wrap">
                    {product.variants.sizes.map(size => {
                        const isSelected = selectedSize === size;
                        return (
                            <TouchableOpacity 
                                key={size}
                                onPress={() => setSelectedSize(size)}
                                className={`px-4 py-2 border rounded mr-3 mb-3 ${isSelected ? 'border-primary bg-orange-50' : 'border-gray-200'}`}
                            >
                                <Text className={`text-sm ${isSelected ? 'text-primary' : 'text-textMain'}`}>{size}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Quantity */}
                <View className="flex-row items-center justify-between mt-4 border-t border-gray-100 pt-4">
                    <Text className="text-sm text-textMain">Số lượng</Text>
                    <View className="flex-row items-center border border-gray-300 rounded">
                        <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 border-r border-gray-300">
                            <Text className="text-gray-600">-</Text>
                        </TouchableOpacity>
                        <Text className="px-4 py-1 font-medium">{quantity}</Text>
                        <TouchableOpacity onPress={() => setQuantity(q => q + 1)} className="px-3 py-1 border-l border-gray-300">
                            <Text className="text-gray-600">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Shipping Info Placeholder */}
            <View className="bg-white p-4 mb-2 flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Text className="text-secondary text-xs font-bold mr-2">Freeship Xtra</Text>
                    <Text className="text-xs text-textSub">Miễn phí vận chuyển cho đơn từ 0đ</Text>
                </View>
                <Text className="text-gray-400">{' > '}</Text>
            </View>

             {/* Reviews Summary */}
             <View className="bg-white p-4 mb-2">
                <View className="flex-row justify-between mb-2">
                    <Text className="font-bold text-textMain">Đánh giá sản phẩm</Text>
                    <Text className="text-primary text-xs">Xem tất cả (250) {' > '}</Text>
                </View>
                <View className="flex-row items-center mb-2">
                     <Image source={{ uri: 'https://picsum.photos/40/40' }} className="w-8 h-8 rounded-full bg-gray-200 mr-2" />
                     <View>
                        <Text className="text-xs text-textMain">nguyenvana</Text>
                        <Text className="text-[10px] text-textSub">Màu sắc: Đen, Size: L</Text>
                     </View>
                </View>
                <Text className="text-xs text-textMain">Áo đẹp, vải mát, giao hàng nhanh. Sẽ ủng hộ shop tiếp.</Text>
            </View>

            <View className="h-24" /> 
        </ScrollView>

        {/* Sticky Bottom Bar */}
        <Animated.View entering={Layout.springify()} className="absolute bottom-0 left-0 right-0 bg-white flex-row h-[70px] pb-[10px] border-t border-gray-200 items-center">
            <View className="flex-1 flex-row">
                <TouchableOpacity className="flex-1 items-center justify-center border-r border-gray-100 bg-teal-50">
                    <Text className="text-[10px] text-teal-600 font-bold">Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-center justify-center border-r border-gray-100">
                    <Text className="text-[10px] text-textSub">Thêm</Text>
                </TouchableOpacity>
            </View>
            
            <View className="flex-[2] flex-row pr-2 pl-2 space-x-2">
                 {/* This view acts as the reference for "Add to Cart" button animation */}
                <View ref={addToCartButtonRef} collapsable={false} className="flex-1">
                    <TouchableOpacity 
                        onPress={handleAddToCart}
                        className="flex-1 bg-teal-600/10 border border-teal-600 rounded items-center justify-center h-10"
                    >
                        <Text className="text-teal-600 text-xs font-bold">Thêm vào giỏ</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className="flex-1 bg-primary rounded items-center justify-center h-10">
                    <Text className="text-white text-xs font-bold">Mua ngay</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    </View>
  );
};