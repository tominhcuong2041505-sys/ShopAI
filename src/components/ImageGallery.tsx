import React, { useState, useRef } from 'react';
import { View, Image, FlatList, TouchableOpacity, Dimensions, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 400;

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    if (currentIndex >= 0 && currentIndex < images.length) {
      setActiveIndex(currentIndex);
    }
  };

  const onThumbnailPress = (index: number) => {
    listRef.current?.scrollToOffset({ offset: index * width, animated: true });
    setActiveIndex(index);
  };

  return (
    <View className="relative bg-white">
      {/* Main Carousel */}
      <View style={{ height: IMAGE_HEIGHT, width: width }}>
        <FlatList
          ref={listRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <Image 
               source={{ uri: item }} 
               style={{ width: width, height: IMAGE_HEIGHT }}
               resizeMode="cover"
            />
          )}
        />
        
        <View className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">{activeIndex + 1}/{images.length}</Text>
        </View>
      </View>

      {/* Thumbnails */}
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        className="mt-2 pl-4"
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            onPress={() => onThumbnailPress(index)}
            className={`mr-3 w-16 h-16 rounded border ${activeIndex === index ? 'border-primary' : 'border-transparent'}`}
          >
            <Image source={{ uri: item }} className="w-full h-full rounded" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};