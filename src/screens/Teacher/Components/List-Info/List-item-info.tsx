import { View, Text } from 'react-native';

import { styledList } from './styles';

interface listProps {
  position: number;
  name: string;
  points: number;
}

export function ListInfo(props: listProps) {
  return (
    <View style={styledList.container}>
      <Text style={styledList.title}>{props.position}</Text>
      <Text style={styledList.title}>{props.name}</Text>
      <Text style={styledList.title}>{props.points}</Text>
    </View>
  );
}
