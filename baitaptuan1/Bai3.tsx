import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Bai3 = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đếm Số</Text>
      
      {/* Vòng tròn hiển thị số nhỏ gọn hơn */}
      <View style={styles.displayBox}>
        <Text style={styles.numberText}>{count}</Text>
      </View>

      <View style={styles.buttonGroup}>
        {/* Nút nhỏ gọn */}
        <TouchableOpacity 
          style={[styles.button, styles.btnDecrease, count === 0 && styles.btnDisabled]} 
          onPress={() => count > 0 && setCount(count - 1)}
          disabled={count === 0}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.btnIncrease]} 
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5, // Giảm padding
  },
  title: {
    fontSize: 32, // Font chữ nhỏ lại
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  displayBox: {
    width: 100,   // Giảm từ 150 xuống 60
    height: 100,  // Giảm từ 150 xuống 60
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  numberText: {
    fontSize: 24, // Giảm font số
    fontWeight: 'bold',
    color: '#2196F3',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    width: 40, // Nút hình vuông nhỏ
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIncrease: { backgroundColor: '#4CAF50' },
  btnDecrease: { backgroundColor: '#f44336' },
  btnDisabled: { backgroundColor: '#ccc' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default Bai3;