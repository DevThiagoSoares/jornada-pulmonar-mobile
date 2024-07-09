import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import { View, Text } from 'react-native-animatable';
import { Card } from 'react-native-paper';

import { styledCard } from './styles';
import { styledOptions } from '../styles';

import { useAuth } from '~/Shared/Auth';
import { ListQuestionApi } from '~/Shared/api/services/questions';
import { useQuestion } from '~/Shared/hooks/question.context';
import { Toastfy } from '~/Shared/notification/internal';
import { RootStackParamList } from '~/navigation/Routes';
import { questionsDto } from '~/screens/Student/Components/cards/card';
import { modulesDto } from '~/screens/Student/Home';

interface cardProps {
  title: string;
  quantity: number;
  data: modulesDto;
}
type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

export function OptionsCard(props: cardProps) {
  const { user } = useAuth();
  const { setQuestion } = useQuestion();
  const navigation = useNavigation<Props['navigation']>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFindQuestion = async (data: modulesDto) => {
    setIsLoading(true);
    if (user && user?.id) {
      const resp = await ListQuestionApi(user.id);
      if (resp && resp.data) {
        setIsLoading(false);
        const foundQuestions = resp?.data.map((item: questionsDto) => {
          if (item.moduleId === data.id) {
            return { ...item, titleUnit: props.title };
          }
        });
        if (foundQuestions.length > 0) {
          setQuestion(foundQuestions.filter(Boolean));
          navigation.navigate('EditScreenQuestion');
        } else {
          Toastfy('error', 'Não há Questões cadastradas para esta unidade');
          setIsLoading(false);
        }
      }
    }
  };
  return (
    <View style={styledCard.container}>
      <Card elevation={2}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#CD4C3E', true)}
          onPress={() => handleFindQuestion(props.data)}>
          <Card.Content style={styledOptions.containerCard}>
            <View style={styledOptions.containerTitle}>
              <Text style={styledCard.title}>{props.title}</Text>
            </View>
            {isLoading && <ActivityIndicator animating color="white" />}

            <Text style={styledCard.description}>{props.quantity} Questões</Text>
          </Card.Content>
        </TouchableNativeFeedback>
      </Card>
    </View>
  );
}
