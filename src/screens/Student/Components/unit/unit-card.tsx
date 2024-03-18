import { View, Text } from 'react-native-animatable';
import img from 'src/assets/image/União4.png';

import { ComponentLevel } from './component-level';
import { styledUnit } from './styles';

interface cardProps {
  question: string;
  finishe: string;
  level: string;
}

export function UnitCard(props: cardProps) {
  return (
    <View style={styledUnit.container}>
      <ComponentLevel level={props.level} img={img} width={65} height={70} />
      <View style={{ gap: 5 }}>
        <Text style={styledUnit.title}>{props.question}</Text>
        <Text style={styledUnit.text}>{props.finishe}</Text>
      </View>
    </View>
  );
}
