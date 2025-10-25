import { useNavigation } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native';
import { Text, View } from 'react-native-animatable';
import { Card, IconButton } from 'react-native-paper';

import { styledCard } from './styles';

export function CreateCard() {
  const navigation = useNavigation<any>();
  
  const handlePress = () => {
    try {
      navigation.navigate('TabNavigator');
    } catch (error) {
      console.error('Erro na navegação:', error);
    }
  };

  return (
    <View style={styledCard.container} animation="fadeInUp" delay={300} duration={500}>
      <Card elevation={3} style={styledCard.createCardWrapper}>
        <TouchableNativeFeedback
          onPress={handlePress}
          background={TouchableNativeFeedback.Ripple('#CD4C3E', false)}>
          <Card.Content style={styledCard.createCardContent}>
            <IconButton
              icon="plus-circle"
              size={32}
              mode="contained"
              iconColor="#fff"
              style={styledCard.createCardIconWrapper}
            />
            <View style={styledCard.createCardTextWrapper}>
              <Text style={styledCard.createCardText}>Nova unidade</Text>
            </View>
          </Card.Content>
        </TouchableNativeFeedback>
      </Card>
    </View>
  );
}
