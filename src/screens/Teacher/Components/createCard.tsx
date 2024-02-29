import { TouchableNativeFeedback, ScrollView } from 'react-native';
import { View, Text } from 'react-native-animatable';
import { Card, IconButton } from 'react-native-paper';

import { styledCard } from './styles';

export function CreateCard() {
  return (
    <ScrollView>
      <View style={styledCard.container}>
        <Card elevation={2}>
          <TouchableNativeFeedback
            onPress={() => {}}
            background={TouchableNativeFeedback.Ripple('#CD4C3E', true)}>
            <Card.Content style={styledCard.ContainerCard}>
              <View style={styledCard.containerTitle}>
                <Text style={styledCard.title}>Nova unidade</Text>
              </View>
              <IconButton
                icon="plus"
                size={30}
                mode="contained-tonal"
                iconColor="#fff"
                style={{ backgroundColor: '#CD4C3E' }}
              />
            </Card.Content>
          </TouchableNativeFeedback>
        </Card>
      </View>
    </ScrollView>
  );
}
