import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { styledEditQuestion } from './styles';

import { editModule, editOption } from '~/Shared/api/services/modules/modules';
import { editQuestion } from '~/Shared/api/services/questions';
import { Toastfy } from '~/Shared/notification/internal';
import { Alternative } from '~/screens/Question/components/alternative-question';
import { InputNormal } from '~/screens/Question/components/ui';
import { styledAlternative } from '~/screens/Question/styles';
import { questionsDto } from '~/screens/Student/Components/cards/card';

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

interface formProps {
  data: questionsDto;
}

export function FormComponent(props: formProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [alternatives, setAlternatives] = useState<
    | {
        value: string;
        description: string;
      }[]
    | null
  >(null);

  const onSubmit = async (value: FormData) => {
    editTitle(props.data.id, value.question);
    //EditModule(props.data.moduleId, value.titleUnit);
  };

  const editTitle = async (questionId: string, data: string) => {
    try {
      await editQuestion(questionId, data, '');
    } catch (error: any) {
      error.message && Toastfy(error.message, 'error');
      error.response.data.message && Toastfy(error.response.data.message, 'error');
      console.log(error);
    }
  };

  const EditModule = async (moduleId: string, title: string) => {
    try {
      await editModule(moduleId, title);
    } catch (error: any) {
      error.message && Toastfy(error.message, 'error');
      error.response.data.message && Toastfy(error.response.data.message, 'error');
      console.log(error);
    }
  };

  /* const EditOption = async (optionId: string, content: string) => {
    try {
      await editOption(optionId, content);
    } catch (error: any) {
      error.message && Toastfy(error.message, 'error');
      error.response.data.message && Toastfy(error.response.data.message, 'error');
      console.log(error);
    }
  }; */

  useEffect(() => {
    setValue('question', props.data.title);
    setValue('titleUnit', props.data.titleUnit ?? '');
    const newListAlt = props.data.alternatives.map((item: any) => {
      return { value: item.id, description: item.content };
    });
    setAlternatives(newListAlt.filter(Boolean));
  }, [props.data]);

  return (
    <View style={styledEditQuestion.formContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputNormal
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
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputNormal
            value={value}
            errors={errors?.question !== undefined}
            label={errors?.question?.message || 'Digite a Pergunta'}
            onChange={onChange}
          />
        )}
        name="question"
        rules={{ required: 'Pergunta é obrigatório' }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Alternative
            inputError={errors.alternatives !== undefined}
            onChange={onChange}
            errors={errors.alternatives?.message}
            getAlternatives={alternatives}
          />
        )}
        name="alternatives"
        rules={{ required: 'Adicione no mínimo duas alternativas' }}
      />
      <View style={styledEditQuestion.buttonContainer}>
        <Button onPress={() => console.log('oi')} mode="contained" style={styledAlternative.button}>
          Remover Questão
        </Button>
        <Button onPress={handleSubmit(onSubmit)} mode="contained" style={styledAlternative.button}>
          Salvar
        </Button>
      </View>
    </View>
  );
}
