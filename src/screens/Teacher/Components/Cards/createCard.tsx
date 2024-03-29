import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableNativeFeedback } from 'react-native';
import { View, Text } from 'react-native-animatable';
import { Card, IconButton } from 'react-native-paper';

import { styledCard } from './styles';

import { RootStackParamList } from '~/navigation/Routes';

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export function CreateCard() {
  const navigation = useNavigation<Props['navigation']>();
  return (
    <View style={styledCard.container}>
      <Card elevation={0} style={{ backgroundColor: 'transparent', borderRadius: 10 }}>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('TabNavigator')}
          background={TouchableNativeFeedback.Ripple('#CD4C3E', true)}>
          <Card.Content
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'rgba(222, 139, 129, 0.5)',
            }}>
            <View style={styledCard.containerTitle}>
              <Text style={styledCard.title}>Nova unidade</Text>
            </View>
            <IconButton
              icon="plus"
              size={20}
              mode="contained-tonal"
              iconColor="#fff"
              style={{ backgroundColor: '#CD4C3E' }}
            />
          </Card.Content>
        </TouchableNativeFeedback>
      </Card>
    </View>
  );
}
