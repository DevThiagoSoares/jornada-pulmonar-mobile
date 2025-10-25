import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import img from 'src/assets/image/Grupo-6845.png';
import imgLevel from 'src/assets/image/União4.png';

import { styles } from '../../../Login/styles';
import { Divider } from '../unitCard/divider';
import { UnitCard } from '../unitCard/unit-card';

import { useAuth } from '~/Shared/Auth';
import { ListQuestionApi } from '~/Shared/api/services/questions';
import { getUserResponses } from '~/Shared/api/services/userResponses';
import { useQuestion } from '~/Shared/hooks/question.context';
import { BackgroundScreen } from '~/components/screens/background-image';

export interface questionEntity {
  id: string;
  title: string;
  audioUrl: any;
  answered: boolean;
  imageBase64: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
  responsesId: string;
  alternatives: any;
}

export default function Modal() {
  const { question } = useQuestion();
  const { user } = useAuth();
  const [listQuestion, setListQuestion] = useState<questionEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [moduleId, setModuleId] = useState<string | null>(null);

  // Guardar moduleId quando carrega as questões pela primeira vez
  useEffect(() => {
    if (question) {
      const questionsArray = Array.isArray(question) ? question : [question];
      if (questionsArray.length > 0 && questionsArray[0].moduleId) {
        setModuleId(questionsArray[0].moduleId);
        if (__DEV__) {
          console.log('📦 ModuleId salvo:', questionsArray[0].moduleId);
        }
      }
      setListQuestion(questionsArray);
    }
  }, [question]);

  // Atualizar lista sempre que a tela receber foco
  useFocusEffect(
    useCallback(() => {
      if (moduleId && user?.id) {
        handleListQuestion();
      }
      return () => {};
    }, [moduleId, user])
  );

  const handleListQuestion = async () => {
    if (!moduleId || !user?.id) {
      return;
    }

    try {
      setLoading(true);

      // Buscar TODAS as questões do módulo pela API
      const questionsRes = await ListQuestionApi(user.id);
      const allQuestions = questionsRes?.data || [];

      // Filtrar questões deste módulo
      const moduleQuestions = allQuestions.filter(
        (q: any) => q.moduleId === moduleId
      );

      // Buscar respostas atualizadas do usuário
      const userResponsesRes = await getUserResponses(user.id);
      const userResponses = userResponsesRes?.data || [];

      // Criar Set com IDs de questões respondidas CORRETAMENTE
      const answeredQuestionIds = new Set(
        userResponses
          .filter((response: any) => response.isCorrect === true)
          .map((response: any) => response.questionId)
      );

      // Atualizar status answered de cada questão
      const updatedQuestions = moduleQuestions.map((q: questionEntity) => ({
        ...q,
        answered: answeredQuestionIds.has(q.id),
      }));

      setListQuestion(updatedQuestions);

      if (__DEV__) {
        console.log('🔄 Lista de questões atualizada do módulo:', moduleId);
        console.log(`📝 Total de questões: ${updatedQuestions.length}`);
        console.log(`✅ Respondidas: ${updatedQuestions.filter((q: any) => q.answered).length}/${updatedQuestions.length}`);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Erro ao atualizar lista de questões:', error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <BackgroundScreen source={img} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 30 }}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <ActivityIndicator size="large" color="#CD4C3E" />
            <Text style={{ color: '#CD4C3E', marginTop: 10 }}>Atualizando...</Text>
          </View>
        ) : listQuestion.length > 0 ? (
          listQuestion.map((item: questionEntity, idx: number) => (
            <View key={item.id || idx} style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
              <UnitCard
                question={item.title}
                finishe={item.answered ? 'Finalizada' : 'Não iniciada'}
                level={String(idx + 1)}
                imgLevel={imgLevel}
                data={item}
              />
              <Divider key={`divider-${item.id || idx}`} />
            </View>
          ))
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: 'rgba(205, 76, 62, 0.7)', fontSize: 18 }}>
              Nenhuma questão disponível
            </Text>
          </View>
        )}
      </ScrollView>
    </BackgroundScreen>
  );
}
