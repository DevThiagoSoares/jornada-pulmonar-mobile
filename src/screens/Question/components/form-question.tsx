import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';

import { ListQuestionsCard } from './list-question-card';
import { ListSavedQuestion } from './list-saved-question';
import { ButtonDefault, InputTitle } from './ui';

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

  const onSubmit = async (value: FormData) => {
    setIsLoading(true);
    const payload = {
      userId: user?.id,
      titleUnit: value.titleUnit,
      alternatives: value.alternatives,
      question: value.question,
      audioUrl: JSON.stringify(data?.audioUrl) ?? '',
      imageBase64: data?.imgUrl ?? '',
    };
    console.log('cad', payload);
    try {
      await CreateQuestion(payload);
      setData(null);
      setAudioCoordinates(null);
      Toastfy('success', 'Questão cadastrada com sucesso!');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    const { question } = value;
    setSavedQuestions([...savedQuestions, question]);
    setValue('question', '');
    setQuestionCount(questionCount - 1);
  };

  const handleAddQuestion = () => {
    setQuestionCount(questionCount + 1);
  };

  return (
    <View style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <InputTitle
            value={value}
            errors={errors?.titleUnit !== undefined}
            label={errors?.titleUnit?.message || 'Titulo da Unidade'}
            onChange={onChange}
          />
        )}
        name="titleUnit"
        rules={{ required: 'Titulo da unidade é obrigatório' }}
        defaultValue=""
      />
      {savedQuestions.map((savedQuestion, index) => (
        <ListSavedQuestion
          key={index}
          navigation={() => {}}
          reset={() => reset()}
          questioNumber={index + 1}
        />
      ))}
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
      <ButtonDefault label="Nova Questão" onClick={handleAddQuestion} />
    </View>
  );
};

export default FormComponent;
