import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';

import { ListQuestionsCard } from './list-question-card';
import { ListSavedQuestion } from './list-saved-question';
import { ButtonDefault, InputTitle } from './ui';

import { CreateQuestion } from '~/Shared/api/services/questions';
import { useData } from '~/Shared/hooks/audio.context';

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
  const { data } = useData();

  console.log({ data });
  const onSubmit = async (value: FormData) => {
    const payload = {
      userId: '98a83f40-1c80-46c7-8694-df8d8bd38cbb',
      titleUnit: value.titleUnit,
      weight: Number(value.Weight),
      alternatives: value.alternatives,
      question: value.question,
      audioUrl: data.audioUrl,
    };

    try {
      await CreateQuestion(data.imgUrl, payload);
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
