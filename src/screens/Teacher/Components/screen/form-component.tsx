import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { styledEditQuestion } from './styles';

import { Alternative } from '~/screens/Question/components/alternative-question';
import { InputNormal } from '~/screens/Question/components/ui';
import { styledAlternative } from '~/screens/Question/styles';

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

export function FormComponent() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (value: FormData) => {
    console.log(value);
  };

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
