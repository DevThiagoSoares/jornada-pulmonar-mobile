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

  const onSubmit = async (value: FormData) => {
    const payload = {
      userId: '9863cbbe-d443-4063-9f65-ca0d5f9ebb4e',
      titleUnit: value.titleUnit,
      weight: value.Weight,
      questions: [{ question: value.question, alternatives: value.alternatives }],
      audioUrl: data.audioUrl,
    };

    try {
      console.log('img', data);
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
