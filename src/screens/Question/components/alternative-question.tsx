/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, RadioButton, TextInput, IconButton } from 'react-native-paper';

import { styledAlternative, styledForm } from './styles';

interface Alternative {
  value: string;
  label: string;
}
interface OptionsProps {
  onChange: any;
}

export function Alternative(props: OptionsProps) {
  const [correctAlternative, setCorrectAlternative] = useState<string>('');
  const [alternative, setAlternative] = useState<string>('');
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);

  const handleInputChange = (text: string) => {
    setAlternative(text);
  };

  const handleDelete = (id: string) => {
    const result = alternatives.filter((item) => item.value !== id);
    setAlternatives(result);
  };

  const handleAddAlternative = () => {
    if (alternative.trim() !== '') {
      setAlternatives([...alternatives, { value: alternative, label: alternative }]);
      setAlternative('');
    }
  };

  const handleSelectCorrectAlternative = (value: string) => {
    setCorrectAlternative(value);
    const newList = alternatives.map((item) => {
      return {
        label: item.label,
        Value: item.value,
        correctAlt: value,
      };
    });
    props.onChange(newList);
  };

  return (
    <View style={styledAlternative.container}>
      <Text style={styledForm.title}>Resposta:</Text>
      <TextInput
        style={styledAlternative.input}
        mode="outlined"
        outlineColor="#FFF"
        label="Insira uma alternativa"
        value={alternative}
        onChangeText={handleInputChange}
      />
      <Button onPress={handleAddAlternative} mode="contained" style={styledAlternative.button}>
        Adicionar Alternativa
      </Button>

      {alternatives.length > 0 && <Text> Escolha a alternativa correta:</Text>}
      {alternatives.map((alt, idx) => (
        <View key={idx} style={styledAlternative.BoxRadio}>
          <RadioButton.Group
            onValueChange={handleSelectCorrectAlternative}
            value={correctAlternative}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value={alt.value} color="green" />
              <Text>
                {String.fromCharCode(65 + idx)}) {alt.label}
              </Text>
            </View>
          </RadioButton.Group>
          <IconButton icon="delete" onPress={() => handleDelete(alt.value)} />
        </View>
      ))}
    </View>
  );
}
