import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from './Header'; // Import Header cùng thư mục

const Bai1 = () => {
  return (
    <View style={styles.container}>
      {/* 1. Gọi Component Header */}
      <Header title="BÀI TẬP TUẦN 1" />

      <View style={styles.body}>
        {/* 2. Hiển thị dòng chữ */}
        <Text style={styles.textLabel}>
          Môn học: Lập trình thiết bị di động
        </Text>


        {/* 3. Hiển thị View màu xanh */}
        <View style={styles.blueBox}>
          <Text style={styles.boxText}>VIEW</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  body: {
    padding: 20,
    alignItems: 'center',
  },
  textLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  textDesc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  blueBox: {
    width: 150,
    height: 150,
    backgroundColor: 'blue', // Yêu cầu đề bài
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,        // Bo tròn góc
    elevation: 5,            // Đổ bóng cho đẹp (Android)
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default Bai1;