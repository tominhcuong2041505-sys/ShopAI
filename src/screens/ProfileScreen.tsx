import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, Switch, 
  TouchableOpacity, Alert, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native';

// Import component con
import CustomInput from '../components/CustomInput';
import LoadingModal from '../components/LoadingModal';

// 1. Định nghĩa Hằng số & Hàm tiện ích ngay tại đây
const COLORS = {
  primary: '#f97316',    // Cam
  background: '#f5f5f5', // Xám nền
  white: '#ffffff',
  text: '#333333',
  danger: '#ef4444',     // Đỏ
};

// Hàm kiểm tra định dạng (Validation)
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone);

const ProfileScreen = () => {
  // --- STATE ---
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isNotifEnabled, setNotifEnabled] = useState(true);

  // --- LOGIC ---
  const handleSave = () => {
    let newErrors: any = {};
    if (!form.name) newErrors.name = "Vui lòng nhập tên";
    if (!form.address) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!validateEmail(form.email)) newErrors.email = "Email sai định dạng";
    if (!validatePhone(form.phone)) newErrors.phone = "SĐT sai định dạng";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Giả lập lưu dữ liệu mất 2 giây
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Thành công", "Đã cập nhật hồ sơ ShopAI!");
      }, 2000);
    }
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn muốn rời khỏi ShopAI?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive" }
    ]);
  };

  // --- UI ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingModal visible={isLoading} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* HEADER */}
          <View style={styles.header}>
            <Image 
              source={require('../../assets/vnb.png')} 
              style={styles.avatar} 
            />
            <Text style={styles.headerName}>{form.name}</Text>
            <Text style={styles.headerRole}>Thành viên Vàng - ShopVNB</Text>
          </View>

          {/* FORM NHẬP LIỆU */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
            
            <CustomInput 
              label="Họ tên" value={form.name} 
              onChangeText={(t) => setForm({...form, name: t})} error={errors.name}
            />
            <CustomInput 
              label="Email" value={form.email} 
              onChangeText={(t) => setForm({...form, email: t})} error={errors.email}
            />
            <CustomInput 
              label="SĐT" value={form.phone} 
              onChangeText={(t) => setForm({...form, phone: t})} error={errors.phone} keyboardType="numeric"
            />
            <CustomInput 
              label="Địa chỉ sân" value={form.address} 
              onChangeText={(t) => setForm({...form, address: t})} error={errors.address}
            />
            
            <View style={styles.row}>
              <Text style={{color: COLORS.text, fontSize: 16}}>Nhận thông báo</Text>
              <Switch value={isNotifEnabled} onValueChange={setNotifEnabled} trackColor={{true: COLORS.primary}} />
            </View>
          </View>

          {/* BUTTONS */}
          <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
            <Text style={styles.btnText}>Lưu Thay Đổi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
            <Text style={[styles.btnText, {color: COLORS.danger}]}>Đăng Xuất</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: COLORS.primary },
  headerName: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: COLORS.text },
  headerRole: { color: COLORS.primary, fontWeight: 'bold', marginTop: 5 },
  
  section: { backgroundColor: COLORS.white, borderRadius: 12, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: COLORS.text },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  
  btnSave: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  btnLogout: { backgroundColor: COLORS.white, padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.danger },
  btnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 }
});

export default ProfileScreen;