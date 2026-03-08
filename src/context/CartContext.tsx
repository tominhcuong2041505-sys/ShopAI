import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, runOnJS, Easing } from 'react-native-reanimated';
import { CartItem, Coordinate } from '../types';

interface CartContextType {
  cartCount: number;
  addToCart: (item: CartItem, startPos: Coordinate) => void;
  registerCartIcon: (pos: Coordinate) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

// Flying Item Component
const FlyingItem = ({ startPos, endPos, onComplete, imageUri }: { startPos: Coordinate; endPos: Coordinate; onComplete: () => void; imageUri: string }) => {
  const translateX = useSharedValue(startPos.x);
  const translateY = useSharedValue(startPos.y);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(endPos.x, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    translateY.value = withTiming(endPos.y, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    scale.value = withSequence(
      withTiming(1.5, { duration: 200 }),
      withTiming(0.2, { duration: 400 })
    );
    opacity.value = withSequence(
      withTiming(1, { duration: 500 }),
      withTiming(0, { duration: 100 }, (finished) => {
        if (finished) runOnJS(onComplete)();
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ] as any,
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.flyingItem, animatedStyle]}>
      <Image source={{ uri: imageUri }} style={styles.flyingImage} />
    </Animated.View>
  );
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [flyingItems, setFlyingItems] = useState<{ id: number; startPos: Coordinate; image: string }[]>([]);
  const cartIconPos = useRef<Coordinate>({ x: 0, y: 0 });

  const addToCart = (item: CartItem, startPos: Coordinate) => {
    const animId = Date.now();
    const imageToFly = 'https://picsum.photos/100/100?random=1'; 
    
    setFlyingItems(prev => [...prev, { id: animId, startPos, image: imageToFly }]);
    
    // Simulate adding to cart logic
    setTimeout(() => {
        setCartItems(prev => [...prev, item]);
    }, 600);
  };

  const registerCartIcon = (pos: Coordinate) => {
    cartIconPos.current = pos;
  };

  const removeFlyingItem = (id: number) => {
    setFlyingItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartCount: cartItems.length, addToCart, registerCartIcon }}>
      {children}
      {flyingItems.map(item => (
        <FlyingItem
          key={item.id}
          startPos={item.startPos}
          endPos={cartIconPos.current}
          imageUri={item.image}
          onComplete={() => removeFlyingItem(item.id)}
        />
      ))}
    </CartContext.Provider>
  );
};

const styles = StyleSheet.create({
  flyingItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 9999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ee4d2d',
    backgroundColor: 'white',
  },
  flyingImage: {
    width: '100%',
    height: '100%',
  }
});