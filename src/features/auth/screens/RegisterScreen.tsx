import React, { useState } from 'react'; // 1. Thêm useState
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch, StatusBar, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@features/auth/domain/registerSchema';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export default function RegisterScreen() {
  // 2. Tạo state để quản lý việc hiện/ẩn cho 2 ô mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '', terms: false }
  });

  const { register } = useAuthStore();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      Alert.alert("Thành công", "Đăng ký và đăng nhập tự động thành công!");
    } catch (err: any) {
      Alert.alert("Lỗi", err.message || "Không thể đăng ký");
    }
  };

  // Style chung: Thêm 'pr-14' (padding right) để chữ không bị chèn vào nút HIỆN
  const inputStyle = "bg-gray-100 rounded p-4 pr-16 text-base text-gray-800 mt-2 border-gray-200 border";
  const labelStyle = "text-sm font-bold text-gray-700 mt-5";
  const errorStyle = "text-red-500 text-xs mt-1 font-medium";

  // Component nút bấm Show/Hide dùng chung để code gọn hơn
  const ShowHideButton = ({ isVisible, onPress }: { isVisible: boolean, onPress: () => void }) => (
    <TouchableOpacity 
      onPress={onPress} 
      className="absolute right-4 top-6 z-10" // Căn lề phải, nằm đè lên input
    >
      <Text className="text-red-500 font-bold text-xs">
        {isVisible ? "ẨN" : "HIỆN"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      
      {/* HEADER */}
      <SafeAreaView className="bg-gray-900 w-full pt-8 pb-6 shadow-md">
        <Text className="text-white text-center text-lg font-bold uppercase tracking-widest">
          Registration Form
        </Text>
      </SafeAreaView>

      <ScrollView className="flex-1 px-6 pt-2 pb-10" showsVerticalScrollIndicator={false}>
        
        {/* 1. FULL NAME */}
        <Text className={labelStyle}>Full Name</Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${inputStyle} ${errors.fullName ? 'border-red-500 bg-red-50' : ''}`}
              placeholder="Enter your full name"
              placeholderTextColor="#9ca3af"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.fullName && <Text className={errorStyle}>{errors.fullName.message}</Text>}

        {/* 2. EMAIL ADDRESS */}
        <Text className={labelStyle}>Email Address</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${inputStyle} ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
              placeholder="example@email.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text className={errorStyle}>{errors.email.message}</Text>}

        {/* 3. PHONE NUMBER */}
        <Text className={labelStyle}>Phone Number</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${inputStyle} ${errors.phone ? 'border-red-500 bg-red-50' : ''}`}
              placeholder="0912345678"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.phone && <Text className={errorStyle}>{errors.phone.message}</Text>}

        {/* 4. PASSWORD (Đã sửa) */}
        <Text className={labelStyle}>Password</Text>
        <View className="relative"> 
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputStyle} ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword} // Toggle dựa trên state
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {/* Nút bấm hiện ẩn */}
          <ShowHideButton isVisible={showPassword} onPress={() => setShowPassword(!showPassword)} />
        </View>
        {errors.password && <Text className={errorStyle}>{errors.password.message}</Text>}

        {/* 5. CONFIRM PASSWORD (Đã sửa) */}
        <Text className={labelStyle}>Confirm Password</Text>
        <View className="relative">
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputStyle} ${errors.confirmPassword ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showConfirmPassword} // Toggle dựa trên state
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {/* Nút bấm hiện ẩn */}
          <ShowHideButton isVisible={showConfirmPassword} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
        </View>
        {errors.confirmPassword && <Text className={errorStyle}>{errors.confirmPassword.message}</Text>}

        {/* 6. TERMS ACCEPTANCE */}
        <Text className={`${labelStyle} mb-3`}>Terms & Conditions</Text>
        <View className="flex-row items-center mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <Controller
            control={control}
            name="terms"
            render={({ field: { onChange, value } }) => (
              <Switch 
                onValueChange={onChange} 
                value={value} 
                trackColor={{ false: "#d1d5db", true: "#fca5a5" }} 
                thumbColor={value ? "#ef4444" : "#f3f4f6"}
              />
            )}
          />
          <Text className="ml-3 text-gray-700 flex-1">
            I agree to the <Text className="font-bold text-red-500">Terms of Service</Text> and Privacy Policy.
          </Text>
        </View>
        {errors.terms && <Text className="text-red-500 text-xs -mt-5 mb-6 font-medium text-center">{errors.terms.message}</Text>}

        {/* REGISTER BUTTON */}
        <TouchableOpacity 
          className={`py-4 rounded shadow-sm mb-20 ${isSubmitting ? 'bg-red-300' : 'bg-red-500'}`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text className="text-white text-center font-bold text-lg uppercase tracking-wider">
            {isSubmitting ? "Processing..." : "REGISTER"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}