import * as React from 'react';
import { View } from 'react-native';
import { HelperText, RadioButton, Text } from 'react-native-paper';

interface radioProps {
  options: { value: string; label: string }[];
  value: string;
  setValue: (value: string) => void;
  isValidInput: boolean;
}

export const RadioGroup = (props: radioProps) => {
  return (
    <RadioButton.Group onValueChange={(newValue) => props.setValue(newValue)} value={props.value}>
      {props.options.map((item) => (
        <View
          key={item.value}
          style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <RadioButton value={item.value} color="#CD4C3E" />
          <Text>{item.label}</Text>
        </View>
      ))}
      {props.isValidInput && (
        <HelperText type="error" visible={props.isValidInput}>
          Selecione uma das opções!
        </HelperText>
      )}
    </RadioButton.Group>
  );
};
