import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { View, Text } from 'react-native-animatable';
import { TouchableRipple } from 'react-native-paper';

import { ComponentLevel } from './component-level';
import { styledUnit } from './styles';
import { modulesDto } from '../../Home';

import { findQuestionById } from '~/Shared/api/services/questions';
import { useQuestion } from '~/Shared/hooks/question.context';
import { RootStackParamList } from '~/navigation/Routes';

interface cardProps {
  question: string;
  finishe: string;
  level: string;
  imgLevel: any;
  data: modulesDto;
}

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

export function UnitCard(props: cardProps) {
  const navigation = useNavigation<Props['navigation']>();
  const { setQuestion } = useQuestion();

  const handleListQuestion = async (data: modulesDto) => {
    const resp = await findQuestionById(data.id);
    if (resp) setQuestion({ ...resp?.data[0], level: props.level });
    navigation.navigate('ModalQuestion');
  };

  return (
    <TouchableRipple
      onPress={() => handleListQuestion(props.data)}
      rippleColor="rgba(205, 76, 62, 0.7)">
      <View style={styledUnit.container}>
        <ComponentLevel level={props.level} img={props.imgLevel} width={65} height={70} />
        <View style={{ gap: 5 }}>
          <Text style={styledUnit.title}>{props.question}</Text>
          <Text style={styledUnit.text}>{props.finishe}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
}
