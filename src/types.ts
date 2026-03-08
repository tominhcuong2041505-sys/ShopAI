import 'react-native';

export interface ProductVariant {
  id: string;
  name: string;
  image?: string;
  price?: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  soldCount: number;
  images: string[];
  variants: {
    colors: ProductVariant[];
    sizes: string[];
  };
  shop: {
    name: string;
    location: string;
  };
  badges: string[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface FlatListProps<ItemT> {
    className?: string;
  }
}
