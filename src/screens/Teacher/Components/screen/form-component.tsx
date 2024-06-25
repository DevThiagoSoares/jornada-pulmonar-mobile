import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { styledEditQuestion } from './styles';

import { useAuth } from '~/Shared/Auth';
import { deleteQuestion, editQuestion } from '~/Shared/api/services/questions';
import { Toastfy } from '~/Shared/notification/internal';
import { RootStackParamList } from '~/navigation/Routes';
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

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

export function FormComponent(props: formProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const { user } = useAuth();
  const navigation = useNavigation<Props['navigation']>();
  const [alternatives, setAlternatives] = useState<
    | {
        value: string;
        description: string;
      }[]
    | null
  >(null);
  const [correctAlternative, setCorrectAlternative] = useState<{
    description: string;
    correctAlternative: boolean;
  } | null>(null);

  const onSubmit = async (value: FormData) => {
    handleCreateQuestion(value);
  };
  const handleCreateQuestion = async (value: FormData) => {
    try {
      const payload = {
        ...value,
        userId: user?.id,
        imageBase64: '',
        audioUrl: '',
      };
      await editQuestion(props.data.id, payload);
      Toastfy('success', 'Questão editada com sucesso');
      navigation.navigate('DrawerNavigator');
    } catch (error: any) {
      console.log(error);
      error.message && Toastfy('error', error.message);
      error.response.data.message && Toastfy('error', error.response.data.message);
    }
  };

  const handleDelete = async (idQuestion: string) => {
    try {
      await deleteQuestion(idQuestion);
      Toastfy('success', 'Questão removida com sucesso');
      navigation.navigate('DrawerNavigator');
    } catch (error: any) {
      error.message && Toastfy('error', error.message);
    }
  };

  useEffect(() => {
    setValue('question', props.data.title);
    setValue('titleUnit', props.data.titleUnit ?? '');
    const newListAlt = props.data.alternatives.map((item: any) => {
      return { value: item.id, description: item.content };
    });
    const findCorrectAlternative = props.data.alternatives.find(
      (item: any) => item.correctAlternative === true
    );
    findCorrectAlternative &&
      setCorrectAlternative({
        description: findCorrectAlternative.id,
        correctAlternative: findCorrectAlternative.correctAlternative,
      });
    setAlternatives(newListAlt.filter(Boolean));
  }, [props.data]);
  return (
    <View style={styledEditQuestion.formContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputNormal
            disabled
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
            getCorrectAlternative={correctAlternative}
          />
        )}
        name="alternatives"
        rules={{ required: 'Adicione no mínimo duas alternativas' }}
      />
      <View style={styledEditQuestion.buttonContainer}>
        <Button
          mode="contained"
          style={styledAlternative.button}
          onPress={() => handleDelete(props.data.id)}>
          Remover Questão
        </Button>
        <Button onPress={handleSubmit(onSubmit)} mode="contained" style={styledAlternative.button}>
          Salvar
        </Button>
      </View>
    </View>
  );
}
