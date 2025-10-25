import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import { Text, View } from 'react-native-animatable';
import { Card } from 'react-native-paper';

import { styledOptions } from '../styles';
import { styledCard } from './styles';

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
  index: number;
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
  const cardColors = [
    'rgba(205, 76, 62, 0.85)',
    'rgba(222, 139, 129, 0.85)',
    'rgba(180, 60, 50, 0.85)',
    'rgba(205, 100, 80, 0.85)',
  ];

  return (
    <View style={styledCard.container} animation="fadeInUp" delay={props.index * 100} duration={500}>
      <Card elevation={4} style={styledOptions.card}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#CD4C3E', false)}
          onPress={() => handleFindQuestion(props.data)}>
          <Card.Content style={[styledOptions.containerCard, { backgroundColor: cardColors[props.index % 4] }]}>
            <View style={styledOptions.headerContainer}>
              <View style={styledOptions.containerTitle}>
                <Text style={styledCard.title} numberOfLines={2}>{props.title}</Text>
              </View>
            </View>
            
            {isLoading ? (
              <ActivityIndicator animating color="white" size="small" />
            ) : (
              <View style={styledOptions.footerContainer}>
                <View style={styledOptions.questionsContainer}>
                  <Text style={styledOptions.questionsNumber}>{props.quantity}</Text>
                  <Text style={styledCard.description}>
                    {props.quantity === 1 ? 'Questão' : 'Questões'}
                  </Text>
                </View>
              </View>
            )}
          </Card.Content>
        </TouchableNativeFeedback>
      </Card>
    </View>
  );
}
