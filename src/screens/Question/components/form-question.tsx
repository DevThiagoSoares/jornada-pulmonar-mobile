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

  const onSubmit = async (value: FormData) => {
    const payload = {
      userId: user?.id,
      titleUnit: value.titleUnit,
      weight: Number(value.Weight),
      alternatives: value.alternatives,
      question: value.question,
      audioUrl: data.audioUrl,
    };

    try {
      await CreateQuestion(data.imgUrl, payload);
      setData(null);
      setAudioCoordinates(null);
      Toastfy('error', 'Questão cadastrada com sucesso!');
    } catch (error) {
      console.log(error);
    }
    const { question } = value;
    setSavedQuestions([...savedQuestions, question]);
    setValue('Weight', '');
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
        />
      ))}
      <ButtonDefault label="Nova Questão" onClick={handleAddQuestion} />
    </View>
  );
};

export default FormComponent;
