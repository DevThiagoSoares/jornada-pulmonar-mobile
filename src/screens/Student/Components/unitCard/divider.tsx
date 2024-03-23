import React from 'react';
import { View } from 'react-native';

export function Divider() {
  return (
    <View
      style={{
        borderLeftWidth: 3, // Define a largura da borda esquerda
        borderLeftColor: '#CD4C3E', // Cor da borda esquerda
        borderStyle: 'dashed',
        width: '10%',
        height: 50,
        left: 30,
        marginTop: 10,
      }}
    />
  );
}
