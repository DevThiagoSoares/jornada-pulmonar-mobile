import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import img from 'src/assets/image/Grupo-6845.png';
import imgEnfer2 from 'src/assets/image/Grupo7222.png';
import imgEnfer1 from 'src/assets/image/GrupoEnfer.png';

import { CardTemplate } from './Components/cards/card';

import { useAuth } from '~/Shared/Auth';
import { getModules } from '~/Shared/api/services/modules/modules';
import { ListQuestionApi } from '~/Shared/api/services/questions';
import { getUserResponses } from '~/Shared/api/services/userResponses';
import { BackgroundScreen } from '~/components/screens/background-image';

export interface modulesDto {
  id: string;
  questionsCount: number;
  title: string;
  userId: string;
  level?: number;
  responsesId?: string;
  answeredCount?: number; // Contador de questões respondidas
}

const HomeStudent = () => {
  const [listModules, setListModules] = useState<modulesDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      handleListModules();
      return () => {};
    }, [])
  );

  const handleListModules = async () => {
    try {
      setLoading(true);

      if (!user?.id) {
        setListModules([]);
        return;
      }

      // 1. Buscar módulos
      const modulesRes = await getModules();
      
      if (!modulesRes?.data) {
        setListModules([]);
        return;
      }

      // 2. Buscar todas as questões
      const questionsRes = await ListQuestionApi(user.id);
      const allQuestions = questionsRes?.data || [];

      // 3. Buscar respostas corretas do usuário (UserResponses)
      const userResponsesRes = await getUserResponses(user.id);
      const userResponses = userResponsesRes?.data || [];

      // Criar um Set com IDs de questões respondidas CORRETAMENTE pelo usuário
      const answeredQuestionIds = new Set(
        userResponses
          .filter((response: any) => response.isCorrect === true)
          .map((response: any) => response.questionId)
      );

      if (__DEV__) {
        console.log('📊 Respostas corretas do usuário:', answeredQuestionIds.size);
      }

      // 4. Filtrar módulos com questões e calcular progresso baseado em UserResponses
      const modulesWithProgress = modulesRes.data
        .filter((item: modulesDto) => item.questionsCount > 0)
        .map((module: modulesDto) => {
          // Contar quantas questões deste módulo foram respondidas CORRETAMENTE
          const moduleQuestions = allQuestions.filter(
            (q: any) => q.moduleId === module.id
          );
          
          const answeredCount = moduleQuestions.filter(
            (q: any) => answeredQuestionIds.has(q.id)
          ).length;

          if (__DEV__) {
            console.log(`📚 Módulo "${module.title}": ${answeredCount}/${moduleQuestions.length} respondidas`);
          }

          return {
            ...module,
            answeredCount,
          };
        });

      setListModules(modulesWithProgress);
    } catch (error) {
      if (__DEV__) {
        console.error('Erro ao carregar módulos:', error);
      }
      setListModules([]);
    } finally {
      setLoading(false);
    }
  };

  const getAvatar = (index: number) => {
    if (index % 2 !== 0) {
      return imgEnfer2;
    } else {
      return imgEnfer1;
    }
  };
  return (
    <BackgroundScreen
      resizeMode="cover"
      source={img}
      style={[styles.backgroundImage, { backgroundColor: 'rgba(250, 206, 202, 1)' }]}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#CD4C3E" />
          <Text style={{ color: '#CD4C3E', marginTop: 10, fontSize: 16 }}>
            Carregando unidades...
          </Text>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={370} // Largura do card (350) + margem (20)
          snapToAlignment="center"
        >
          {listModules.length > 0 ? (
            listModules.map((item: modulesDto, idx: number) => {
              const answeredCount = item.answeredCount || 0;
              const progress = item.questionsCount > 0 ? answeredCount / item.questionsCount : 0;

              return (
                <CardTemplate
                  key={item.id}
                  title={item.title}
                  totalQuest={item.questionsCount}
                  totalFinished={answeredCount}
                  progress={progress}
                  img={getAvatar(idx)}
                  data={[item]}
                />
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Ainda não há Unidades para você
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 80, // Espaço para a imagem do avatar que fica acima do card
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    minWidth: 300,
  },
  emptyText: {
    color: 'rgba(205, 76, 62, 0.7)',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default HomeStudent;
