import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import { styledAlternative, styledCard } from './styles';

import { RootStackParamList } from '~/navigation/Routes';
import { Alternative } from '~/screens/Question/components/alternative-question';

interface alternativaProps {
  options: Alternative[];
}

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

export function AlternativaCard(props: alternativaProps) {
  const navigation = useNavigation<Props['navigation']>();
  const [correctAlternative, setCorrectAlternative] = useState<string>('');

  const handleSelectCorrectAlternative = (value: string) => {
    setCorrectAlternative(value);
  };

  return (
    <View style={styledAlternative.container}>
      <Text style={styledAlternative.title}>Qual diagnóstico ?</Text>
      {props.options.map((alt, idx) => (
        <View key={idx}>
          <Text
            onPress={() => handleSelectCorrectAlternative(alt.description)}
            style={
              correctAlternative !== alt.description
                ? styledAlternative.alternative
                : styledAlternative.alternativeCorrect
            }>
            {String.fromCharCode(65 + idx)}) {alt.description}
          </Text>
        </View>
      ))}
      <View style={styledCard.buttonContainer}>
        <Button
          style={styledCard.button}
          textColor="#FFFF"
          labelStyle={{ fontSize: 15 }}
          onPress={() => navigation.navigate('ScreenResponse')}>
          SALVAR
        </Button>
      </View>
    </View>
  );
}
