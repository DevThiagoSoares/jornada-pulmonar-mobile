import { TouchableNativeFeedback } from 'react-native';
import { View, Text } from 'react-native-animatable';
import { Card } from 'react-native-paper';

import { styledCard, styledOptions } from './styles';

interface cardProps {
  title: string;
  subTitle: string;
  quantity: number;
}

export function OptionsCard(props: cardProps) {
  return (
    <View style={styledCard.container}>
      <Card elevation={2}>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CD4C3E', true)}>
          <Card.Content style={styledOptions.containerCard}>
            <View style={styledOptions.containerTitle}>
              <Text style={styledCard.title}>{props.title}</Text>
            </View>
            <Text>{props.subTitle}</Text>
            <Text>{props.quantity} Questões</Text>
          </Card.Content>
        </TouchableNativeFeedback>
      </Card>
    </View>
  );
}
