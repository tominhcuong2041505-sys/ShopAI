import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bai2 = () => {
  return (
    <View style={styles.container}>
      {/* 1. Header: Cao 80px, Màu xanh */}
      <View style={styles.header}>
        <Text style={styles.textWhite}>HEADER</Text>
      </View>

      {/* 2. Content: Chiếm phần còn lại (flex: 1), Màu trắng */}
      <View style={styles.content}>
        <Text style={styles.textBlack}>CONTENT</Text>
        <Text style={styles.subText}>(Chứa nội dung chính của App)</Text>
      </View>

      {/* 3. Footer: Cao 80px, Màu xám */}
      <View style={styles.footer}>
        <Text style={styles.textBlack}>FOOTER</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Bao phủ toàn bộ màn hình
    flexDirection: 'column', // Xếp theo chiều dọc (Mặc định)
  },
  // Style cho Header
  header: {
    height: 80,              // Chiều cao cố định
    backgroundColor: 'blue', // Màu xanh
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style cho Content
  content: {
    flex: 1,                 // QUAN TRỌNG: Chiếm hết không gian còn lại
    backgroundColor: '#fff', // Màu trắng
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style cho Footer
  footer: {
    height: 80,              // Chiều cao cố định
    backgroundColor: '#ccc', // Màu xám (light gray)
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style chữ cho đẹp
  textWhite: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textBlack: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  subText: {
    color: '#666',
    marginTop: 10,
  }
});

export default Bai2;