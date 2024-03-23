/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, RadioButton, TextInput, IconButton } from 'react-native-paper';

import { styledAlternative, styledForm } from '../styles';
import { InputNormal } from './ui';

export interface Alternative {
  value: string;
  description: string;
}
interface OptionsProps {
  onChange: any;
  errors?: string | undefined;
}

export function Alternative(props: OptionsProps) {
  const [correctAlternative, setCorrectAlternative] = useState<string>('');
  const [alternative, setAlternative] = useState<string>('');
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);

  useEffect(() => {
    if (alternatives.length <= 1) {
      props.onChange([]);
    }
    if (alternatives.length > 1) {
      props.onChange([...alternatives, { correctAlternative }]);
    }
  }, [alternatives, correctAlternative]);

  const handleInputChange = (text: string) => {
    setAlternative(text);
  };

  const handleDelete = (id: string) => {
    const result = alternatives.filter((item) => item.value !== id);
    setAlternatives(result);
    if (result.length === 1) {
      props.onChange([]);
    }
  };
  const handleAddAlternative = () => {
    if (alternative.trim() !== '') {
      setAlternatives([...alternatives, { value: alternative, description: alternative }]);
      setAlternative('');
      setCorrectAlternative(alternative);
    }
  };

  const handleSelectCorrectAlternative = (value: string) => {
    setCorrectAlternative(value);
  };

  return (
    <View style={styledAlternative.container}>
      <Text style={styledForm.title}>Resposta:</Text>
      <InputNormal
        label={props.errors ? props.errors : 'Insira uma alternativa'}
        value={alternative}
        icon={<TextInput.Icon icon="delete" color="#CD4C3E" />}
        onChange={handleInputChange}
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
                {String.fromCharCode(65 + idx)}) {alt.description}
              </Text>
            </View>
          </RadioButton.Group>
          <IconButton icon="delete" onPress={() => handleDelete(alt.value)} />
        </View>
      ))}
    </View>
  );
}
