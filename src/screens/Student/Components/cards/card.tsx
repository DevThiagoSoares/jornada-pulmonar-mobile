import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Card, ProgressBar, Text } from 'react-native-paper';

import { styledCard } from './styles';
import { modulesDto } from '../../Home';

import { useAuth } from '~/Shared/Auth';
import { ListQuestionApi } from '~/Shared/api/services/questions';
import { useQuestion } from '~/Shared/hooks/question.context';
import { Toastfy } from '~/Shared/notification/internal';
import { RootStackParamList } from '~/navigation/Routes';

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

interface cardProps {
  title: string;
  totalQuest: number;
  totalFinished: number;
  progress: number;
  img: any;
  data: modulesDto[];
}
export interface questionsDto {
  audioUrl: string;
  createdAt: string;
  id: string;
  questionId?: string;
  imgNameUrl: string;
  imageBase64?: string;
  moduleId: string;
  level?: number;
  title: string;
  alternatives?: any;
  answered?: any;
  titleUnit?: string;
}
export function CardTemplate(props: cardProps) {
  const navigation = useNavigation<Props['navigation']>();
  const { setQuestion } = useQuestion();
  const [loading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const handleListQuestions = async (data: modulesDto[]) => {
    setIsLoading(true);
    if (user && user?.id) {
      const resp = await ListQuestionApi(user.id);

      if (resp && resp.data) {
        const foundQuestions = resp?.data.map((item: questionsDto) => {
          if (item.moduleId === data[0].id) {
            return item;
          }
        });
        if (foundQuestions.length > 0) {
          setIsLoading(false);
          setQuestion(foundQuestions.filter(Boolean));
          navigation.navigate('Modal');
        } else {
          setIsLoading(false);
          Toastfy('error', 'Não há Questões cadastradas para esta unidade');
        }
      }
    }
  };
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Card style={styledCard.cardContainer}>
        <Card.Content style={styledCard.content}>
          <View style={styledCard.avatar}>
            <Image source={props.img} style={{ width: 110, height: 175 }} />
          </View>
          <View style={{ display: 'flex', marginBottom: 30, gap: 15 }}>
            <Text variant="titleLarge" style={styledCard.title}>
              {props.title}
            </Text>
            <Text variant="bodyMedium" style={styledCard.text}>
              CONCLUÍDA - {props.totalFinished} / {props.totalQuest} PERGUNTAS
            </Text>
            <ProgressBar progress={props.progress} color="#FFB100" style={styledCard.progress} />
          </View>
        </Card.Content>
        <Card.Actions>
          <TouchableOpacity style={{ backgroundColor: 'transparent' }}>
            <Button
              mode="contained"
              icon="arrow-right"
              contentStyle={{ flexDirection: 'row-reverse' }}
              style={{ backgroundColor: '#FFE815' }}
              labelStyle={styledCard.buttonLabel}
              loading={loading}
              onPress={() => handleListQuestions(props.data)}
              color="#9F8500">
              Começar
            </Button>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </View>
  );
}
