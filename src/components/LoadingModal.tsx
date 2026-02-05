import React from 'react';
import { View, Modal, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingModal = ({ visible, message = "Đang xử lý..." }: { visible: boolean, message?: string }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Màu cam ShopVNB */}
          <ActivityIndicator size="large" color="#f97316" />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  text: { marginTop: 15, fontSize: 16, fontWeight: '500', color: '#333' },
});

export default LoadingModal;