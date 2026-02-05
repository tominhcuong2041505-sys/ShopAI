import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Bai4 = () => {
  // Khởi tạo state: Mặc định là đang hiện (true)
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ẩn / Hiện Nội Dung</Text>

      {/* KHU VỰC HIỂN THỊ NỘI DUNG */}
      {/* Sử dụng toán tử &&: Nếu isVisible là true thì mới render View bên phải */}
      <View style={styles.contentContainer}>
        {isVisible && (
          <View style={styles.box}>
            <Text style={styles.textContent}>
              Suprise mother f....
            </Text>
          </View>
        )}
      </View>

      {/* NÚT BẤM */}
      <TouchableOpacity 
        style={[styles.button, isVisible ? styles.btnHide : styles.btnShow]}
        onPress={() => setIsVisible(!isVisible)} // Đảo ngược trạng thái
      >
        {/* Đổi text nút theo trạng thái */}
        <Text style={styles.btnText}>
          {isVisible ? "ẨN " : "HIỆN "}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',   // Căn giữa nội dung
    alignItems: 'center',
    flex: 1,                    // KEY FIX: Cho phép vùng này giãn nở tối đa chiếm chỗ trống thừa
    paddingVertical: 10,        // Tạo khoảng thở trên dưới
  },
  box: {
    width: '100%',
    padding: 10,
    backgroundColor: '#E3F2FD', // Xanh nhạt
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  textContent: {
    fontSize: 13,
    color: '#1565C0',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
    minWidth: 100,
    alignItems: 'center',
    elevation: 3, // Bóng đổ Android
  },
  // Style riêng cho từng trạng thái nút
  btnShow: {
    backgroundColor: '#4CAF50', // Màu xanh lá (Hiện)
  },
  btnHide: {
    backgroundColor: '#F44336', // Màu đỏ (Ẩn)
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Bai4;