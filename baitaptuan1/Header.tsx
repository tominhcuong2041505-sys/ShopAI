import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#007AFF', // Màu xanh dương chuẩn iOS
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Header;