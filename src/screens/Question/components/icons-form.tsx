import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import { styledForm } from './styles';

export function IconsForm() {
  return (
    <View style={styledForm.icons}>
      <Text style={styledForm.title}>Questão</Text>
      <View style={styledForm.icons}>
        <IconButton
          icon="image"
          mode="contained"
          size={30}
          iconColor="#FFF"
          style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
        />
        <IconButton
          icon="delete"
          mode="contained"
          size={30}
          iconColor="#FFF"
          style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
        />
      </View>
    </View>
  );
}
