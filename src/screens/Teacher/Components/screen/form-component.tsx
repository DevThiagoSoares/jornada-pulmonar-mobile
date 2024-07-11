import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { styledEditQuestion } from './styles';

import { useAuth } from '~/Shared/Auth';
import { deleteQuestion, editQuestion } from '~/Shared/api/services/questions';
import { useData } from '~/Shared/hooks/audio.context';
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
  const { setData } = useData();
  const navigation = useNavigation<Props['navigation']>();
  const [alternatives, setAlternatives] = useState<
    | {
        value: string;
        description: string;
      }[]
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [correctAlternative, setCorrectAlternative] = useState<{
    description: string;
    correctAlternative: boolean;
  } | null>(null);

  const onSubmit = async (value: FormData) => {
    handleCreateQuestion(value);
  };
  const handleCreateQuestion = async (value: FormData) => {
    setIsSaved(true);
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
      setIsSaved(false);
    } catch (error: any) {
      setIsSaved(false);
      console.log(error);
      error.message && Toastfy('error', error.message);
      error.response.data.message && Toastfy('error', error.response.data.message);
    }
  };

  const handleDelete = async (idQuestion: string) => {
    setIsLoading(true);
    try {
      await deleteQuestion(idQuestion);
      Toastfy('success', 'Questão removida com sucesso');
      navigation.navigate('DrawerNavigator');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
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

  const handleNavigate = () => {
    setData({ imageBase64: props.data.imageBase64, audioUrl: props.data.audioUrl });
    navigation.navigate('ImageStepForm');
  };

  return (
    <View style={styledEditQuestion.formContainer}>
      <TouchableOpacity onPress={handleNavigate} style={styledEditQuestion.contextEditImage}>
        <Text style={{ color: '#CD4C3E' }}> Editar imagens</Text>
        <Ionicons name="image" size={35} color="#CD4C3E" />
      </TouchableOpacity>
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
          loading={isLoading}
          onPress={() => handleDelete(props.data.id)}>
          Remover Questão
        </Button>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          loading={isSaved}
          style={styledAlternative.button}>
          Salvar
        </Button>
      </View>
    </View>
  );
}
