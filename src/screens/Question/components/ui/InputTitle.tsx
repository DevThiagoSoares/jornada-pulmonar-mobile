import React from 'react';
import { TextInput } from 'react-native-paper';

interface InputProps {
  value: string;
  label: string;
  onChange?: (text: string) => void;
  errors?: boolean;
}

export const InputTitle: React.FC<InputProps> = ({ value, label, onChange, errors }) => {
  return (
    <TextInput
      error={errors}
      mode="outlined"
      outlineStyle={{ borderRadius: 12 }}
      outlineColor="rgba(229, 204, 200, 0.5)"
      textColor="#CD4C3E"
      cursorColor="#CD4C3E"
      activeOutlineColor="#CD4C3E"
      selectionColor="#CD4C3E"
      underlineColor="#CD4C3E"
      value={value}
      label={label}
      onChangeText={onChange}
    />
  );
};
