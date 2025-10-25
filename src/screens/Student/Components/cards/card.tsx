import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Card, ProgressBar, Text } from 'react-native-paper';

import { modulesDto } from '../../Home';
import { styledCard } from './styles';

import { useAuth } from '~/Shared/Auth';
import { ListQuestionApi } from '~/Shared/api/services/questions';
import { getUserResponses } from '~/Shared/api/services/userResponses';
import { useQuestion } from '~/Shared/hooks/question.context';
import { Toastfy } from '~/Shared/notification/internal';
import { RootStackParamList } from '~/navigation/Routes';
import { getErrorMessage } from '~/utils';

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
    if (loading) return; // Prevenir múltiplos cliques
    
    if (!user?.id) {
      Toastfy('error', 'Usuário não autenticado');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 1. Buscar todas as questões
      const resp = await ListQuestionApi(user.id);

      if (!resp?.data) {
        throw new Error('Não foi possível carregar as questões');
      }

      // 2. Buscar respostas corretas do usuário
      const userResponsesRes = await getUserResponses(user.id);
      const userResponses = userResponsesRes?.data || [];

      // Criar Set com IDs de questões respondidas CORRETAMENTE
      const answeredQuestionIds = new Set(
        userResponses
          .filter((response: any) => response.isCorrect === true)
          .map((response: any) => response.questionId)
      );

      // 3. Filtrar questões do módulo e adicionar status correto
      const foundQuestions = resp.data
        .filter((item: questionsDto) => item.moduleId === data[0]?.id)
        .map((question: questionsDto) => ({
          ...question,
          answered: answeredQuestionIds.has(question.id), // ✅ Status correto baseado em UserResponses
        }))
        .filter(Boolean);

      if (__DEV__) {
        console.log(`🔍 Questões do módulo: ${foundQuestions.length}`);
        console.log(`✅ Respondidas: ${foundQuestions.filter((q: any) => q.answered).length}`);
      }

      if (foundQuestions.length > 0) {
        setQuestion(foundQuestions);
        navigation.navigate('Modal');
      } else {
        Toastfy('info', 'Não há questões cadastradas para esta unidade');
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      Toastfy('error', errorMessage);
      
      if (__DEV__) {
        console.error('Erro ao carregar questões:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styledCard.cardWrapper}>
      <Card style={styledCard.cardContainer}>
        <Card.Content style={styledCard.content}>
          <View style={styledCard.avatar}>
            <Image 
              source={props.img} 
              style={styledCard.avatarImage}
              resizeMode="contain"
            />
          </View>
          <View style={styledCard.textContainer}>
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
