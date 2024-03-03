import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface Textprops {
  description: string;
  handleDelete: () => void;
}

export function Alternative(props: Textprops) {
  return (
    <View>
      <Text>Resposta:</Text>
      <View>
        <Text>{props.description}</Text>
      </View>
    </View>
  );
}
