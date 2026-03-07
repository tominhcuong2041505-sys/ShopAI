import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Import các màn hình của bạn
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AccountStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Profile">
            {(props) => (
              <ProfileScreen 
                {...props} 
                userData={user} 
                onLogout={() => setIsLoggedIn(false)} 
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen 
                {...props} 
                onLoginSuccess={(name: string, email: string) => {
                  setUser({ name, email });
                  setIsLoggedIn(true);
                }} 
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View className="flex-1 justify-center items-center bg-gray-50">
    <Icon name="construct-outline" size={60} color="#d1d5db" />
    <Text className="text-gray-400 mt-4 font-bold">{title}</Text>
  </View>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home';
          if (route.name === 'Trang chủ') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Khuyến mãi') iconName = focused ? 'gift' : 'gift-outline';
          else if (route.name === 'Thông báo') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'Tài khoản') iconName = focused ? 'person' : 'person-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0056A4',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 65, paddingBottom: 10 },
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Khuyến mãi" children={() => <PlaceholderScreen title="KHUYẾN MÃI" />} />
      <Tab.Screen name="Thông báo" children={() => <PlaceholderScreen title="THÔNG BÁO" />} />
      <Tab.Screen name="Tài khoản" component={AccountStack} />
    </Tab.Navigator>
  );
}