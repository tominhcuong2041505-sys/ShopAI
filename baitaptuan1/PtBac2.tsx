import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PtBac2 = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState('Nhập hệ số và nhấn Giải');

  const giaiPT = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      setResult('Vui lòng nhập đủ số!');
      return;
    }

    if (numA === 0) {
      setResult(numB === 0 ? (numC === 0 ? 'vô số nghiệm' : 'vô nghiệm') : `x = ${-numC / numB}`);
      return;
    }

    const delta = numB * numB - 4 * numA * numC;
    if (delta < 0) setResult('Phương trình vô nghiệm');
    else if (delta === 0) setResult(`Nghiệm kép x = ${-numB / (2 * numA)}`);
    else {
      const x1 = (-numB + Math.sqrt(delta)) / (2 * numA);
      const x2 = (-numB - Math.sqrt(delta)) / (2 * numA);
      setResult(`x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GIẢI PHƯƠNG TRÌNH BẬC 2</Text>
      <View style={styles.inputGroup}>
        <TextInput placeholder="a" style={styles.input} keyboardType="numeric" onChangeText={setA} />
        <TextInput placeholder="b" style={styles.input} keyboardType="numeric" onChangeText={setB} />
        <TextInput placeholder="c" style={styles.input} keyboardType="numeric" onChangeText={setC} />
      </View>
      <TouchableOpacity style={styles.button} onPress={giaiPT}>
        <Text style={styles.btnText}>GIẢI</Text>
      </TouchableOpacity>
      <Text style={styles.resText}>{result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center', backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  inputGroup: { flexDirection: 'row', gap: 5, marginBottom: 10 },
  input: { borderBottomWidth: 1, width: 40, textAlign: 'center' },
  button: { backgroundColor: '#2196F3', padding: 8, borderRadius: 5 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  resText: { marginTop: 10, color: 'red', fontWeight: 'bold', fontSize: 13 }
});

export default PtBac2;