import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { styledCheckBox } from './styles';

interface ItemsProps {
  isChecked: boolean;
  toggleCheckbox: () => any;
  description: string;
  itemId: number | string | null; // Adicionando uma propriedade para identificar o item
  selectedItemId: number | string | null; // Adicionando o ID do item selecionado
  setSelectedItemId: (itemId: number | string | null) => void; // Função para atualizar o item selecionado
}

const CheckBox = (props: ItemsProps) => {
  const handlePress = () => {
    if (props.selectedItemId === props.itemId) {
      props.setSelectedItemId(null); // Desmarca o item se já estiver selecionado
    } else {
      props.setSelectedItemId(props.itemId); // Seleciona o item se não estiver selecionado
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styledCheckBox.container}>
        <View style={styledCheckBox.box}>
          {props.isChecked && <View style={styledCheckBox.checked} />}
        </View>
        <Text>{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
