import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { ListQuestionsCard } from './list-question-card';
import { ListSavedQuestion } from './list-saved-question';
import { ButtonDefault, ModuleSelector } from './ui';

import { useAuth } from '~/Shared/Auth';
import { CreateQuestion } from '~/Shared/api/services/questions';
import { useData } from '~/Shared/hooks/audio.context';
import { Toastfy } from '~/Shared/notification/internal';

interface optionsAlt {
  label: string;
  value: string;
  correctAlternative: string;
}

interface FormData {
  titleUnit: string;
  question: string;
  Weight: string;
  alternatives: optionsAlt[];
}

export const FormComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [questionCount, setQuestionCount] = useState(1);
  const [savedQuestions, setSavedQuestions] = useState<string[]>([]);
  const { data, setAudioCoordinates, setData } = useData();
  const { user } = useAuth();
  const [loading, setIsLoading] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const onSubmit = async (value: FormData) => {
    // Validações antes de enviar
    if (!value.titleUnit?.trim()) {
      Toastfy('error', 'Por favor, selecione ou crie uma unidade');
      return;
    }

    // Imagem é opcional - não é mais validada como obrigatória

    setIsLoading(true);
    
    try {
      const payload = {
        userId: user?.id,
        titleUnit: value.titleUnit.trim(),
        moduleId: selectedModuleId, // Envia o ID se for unidade existente
        alternatives: value.alternatives,
        question: value.question.trim(),
        audioUrl: JSON.stringify(data?.audioUrl) ?? '',
        imageBase64: data?.imgUrl ?? data?.imageBase64 ?? '',
      };

      if (__DEV__) {
        console.log('📝 Criando questão:', { 
          unidade: payload.titleUnit,
          moduleId: payload.moduleId,
          tipo: payload.moduleId ? 'Unidade existente' : 'Nova unidade',
          pergunta: payload.question 
        });
      }

      await CreateQuestion(payload);
      
      // Limpar dados após sucesso
      setData(null);
      setAudioCoordinates(null);
      
      const { question } = value;
      setSavedQuestions([...savedQuestions, question]);
      setValue('question', '');
      setValue('alternatives', []);
      setQuestionCount(questionCount - 1);
      
      Toastfy('success', '✅ Questão cadastrada com sucesso!');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error?.message || 'Erro ao criar questão';
      Toastfy('error', errorMsg);
      
      if (__DEV__) {
        console.error('Erro ao criar questão:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setQuestionCount(questionCount + 1);
  };

  return (
    <View style={styles.container}>
      {/* Seção de seleção de unidade */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Unidade</Text>
        <Text style={styles.sectionSubtitle}>
          Selecione uma unidade existente ou crie uma nova
        </Text>
        <Divider style={styles.divider} />
        
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <ModuleSelector
              value={value}
              errors={errors?.titleUnit !== undefined}
              label={errors?.titleUnit?.message || 'Titulo da Unidade'}
              onChange={onChange}
              onSelectModule={(module) => {
                if (module) {
                  console.log('✅ Unidade selecionada:', module.title, 'ID:', module.id);
                  setSelectedModuleId(module.id);
                } else {
                  console.log('🆕 Nova unidade será criada');
                  setSelectedModuleId(null);
                }
              }}
            />
          )}
          name="titleUnit"
          rules={{ 
            required: 'Titulo da unidade é obrigatório',
            minLength: {
              value: 3,
              message: 'O título deve ter pelo menos 3 caracteres'
            }
          }}
          defaultValue=""
        />
      </View>

      {/* Questões salvas */}
      {savedQuestions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Questões Salvas</Text>
          <Divider style={styles.divider} />
          {savedQuestions.map((savedQuestion, index) => (
            <ListSavedQuestion
              key={index}
              navigation={() => {}}
              reset={() => reset()}
              questioNumber={index + 1}
            />
          ))}
        </View>
      )}

      {/* Formulário de questões */}
      {[...Array(questionCount)].map((_, index) => (
        <ListQuestionsCard
          control={control}
          errors={errors}
          key={index}
          submitForm={handleSubmit(onSubmit)}
          reset={() => reset()}
          isLoadingButton={loading}
        />
      ))}

      {/* Botão para adicionar nova questão */}
      <ButtonDefault label="➕ Nova Questão" onClick={handleAddQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 20,
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#CD4C3E',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  divider: {
    marginBottom: 16,
    backgroundColor: '#E0E0E0',
  },
});

export default FormComponent;
