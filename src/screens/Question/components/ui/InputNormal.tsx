import React from 'react';
import { TextInput } from 'react-native-paper';

interface InputProps {
  value: string;
  label: string;
}

export const InputNormal: React.FC<InputProps> = ({ value, label }) => {
  return (
    <TextInput
      mode="outlined"
      outlineStyle={{ borderRadius: 12 }}
      outlineColor="#FFFFFF"
      textColor="#CD4C3E"
      cursorColor="#CD4C3E"
      activeOutlineColor="#CD4C3E"
      selectionColor="#CD4C3E"
      underlineColor="#CD4C3E"
      inputMode="text"
      value={value}
      label={label}
      style={{ backgroundColor: '#FAEBEA' }}
      theme={{
        colors: {
          placeholder: '#CD4C3E',
          primary: '#CD4C3E',
          accent: '#CD4C3E',
          text: '#CD4C3E',
          onSurface: '#CD4C3E',
        },
      }}
    />
  );
};
