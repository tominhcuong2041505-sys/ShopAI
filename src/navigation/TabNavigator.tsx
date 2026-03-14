import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Features: Product
import HomeScreen from '@features/product/screens/HomeScreen';
import ProductDetailScreen from '@features/product/screens/ProductDetailScreen';
import WishlistScreen from '@features/product/screens/WishlistScreen';

// Features: Auth
import LoginScreen from '@features/auth/screens/LoginScreen';
import RegisterScreen from '@features/auth/screens/RegisterScreen';

// Features: Profile & Order
import ProfileScreen from '@features/profile/screens/ProfileScreen';
import EditProfileScreen from '@features/profile/screens/EditProfileScreen';
import AddressScreen from '@features/profile/screens/AddressScreen';
import EditAddressScreen from '@features/profile/screens/EditAddressScreen';
import ChangePasswordScreen from '@features/profile/screens/ChangePasswordScreen';
import OrderHistoryScreen from '@features/order/screens/OrderHistoryScreen';

// Features: Cart
import CartScreen from '@features/cart/screens/CartScreen';
import CheckoutScreen from '@features/cart/screens/CheckoutScreen';

// IMPORT ZUSTAND AUTH STORE
import { useAuthStore } from '@features/auth/store/useAuthStore';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      {/* screen để truy cập trang chi tiết sản phẩm */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  // LẤY TRẠNG THÁI TỪ ZUSTAND (Thay cho useState cũ)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="EditAddress" component={EditAddressScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let name: any = route.name === 'Trang chủ' ? 'home' : 'person';
          return <Icon name={focused ? name : `${name}-outline`} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0056A4',
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeStack} />
      <Tab.Screen name="Tài khoản" component={AccountStack} />
    </Tab.Navigator>
  );
}