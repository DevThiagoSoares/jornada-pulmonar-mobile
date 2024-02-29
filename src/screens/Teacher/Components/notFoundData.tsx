import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function NotFoundData() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={30} color="#CD4C3E" />
      <Text style={styles.text}>Dados não encontrados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#CD4C3E',
  },
});
