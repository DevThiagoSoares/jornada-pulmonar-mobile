import { TouchableOpacity, View, Text } from 'react-native';

import { styledCheckBox } from './styles';

interface ItemsProps {
  isChecked: boolean;
  toggleCheckbox: () => any;
}

const CheckBox = (props: ItemsProps) => {
  return (
    <TouchableOpacity onPress={props.toggleCheckbox}>
      <View style={styledCheckBox.container}>
        <View style={styledCheckBox.box}>
          {props.isChecked && <View style={styledCheckBox.checked} />}
        </View>
        <Text>Aceito os termos de uso</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
