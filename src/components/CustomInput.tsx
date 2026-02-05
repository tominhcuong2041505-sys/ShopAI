import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

// Định nghĩa màu nội bộ để không phụ thuộc file khác
const COLORS = {
  text: '#333333',
  border: '#dddddd',
  danger: '#ef4444',
  white: '#ffffff',
};

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const CustomInput = ({ label, error, ...props }: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor="#aaa"
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, color: COLORS.text, marginBottom: 5, fontWeight: '600' },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.danger },
  errorText: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
});

export default CustomInput;