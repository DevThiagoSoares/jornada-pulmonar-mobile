import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';

import { ButtonDefault, InputTitle } from './ui';

import { ListQuestionsCard } from './list-question-card';
import { styledForm, styledSavedQuestion } from '../styles';
import { IconButton } from 'react-native-paper';
import { ListSavedQuestion } from './list-saved-question';

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

  const onSubmit = (data: FormData) => {
    const { question } = data;
    console.log(data);
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
