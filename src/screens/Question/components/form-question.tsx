import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import { Alternative } from './alternative-question';
import { ButtonDefault, InputNormal, InputTitle } from './ui';
import { styledForm, styles } from '../styles';

import { RootStackParamList } from '~/navigation/Routes';

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

type Props = StackScreenProps<RootStackParamList, 'ImageStepForm'>;

export const FormComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigation = useNavigation<Props['navigation']>();

  const onSubmit = (data: FormData) => {
    console.log(data.alternatives);
  };

  function SubmitForm() {
    handleSubmit(onSubmit)();
    console.log(errors);
  }

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <InputTitle value={value} label={errors?.titleUnit?.message || 'Titulo da Unidade'} />
        )}
        name="titleUnit"
        rules={{ required: 'Titulo da unidade é obrigatório' }}
        defaultValue=""
      />

      <View style={styledForm.box}>
        <View style={styledForm.icons}>
          <Text style={styledForm.title}>Questão</Text>
          <View style={styledForm.icons}>
            <IconButton
              icon="image"
              mode="contained"
              size={30}
              iconColor="#FFF"
              style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
              onPress={() => navigation.navigate('ImageStepForm')}
            />
            <IconButton
              icon="delete"
              mode="contained"
              size={30}
              iconColor="#FFF"
              style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
            />
          </View>
        </View>

        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <InputNormal
              value={value}
              label={errors?.Weight?.message || 'Peso da Questão'}
              onChange={onChange}
            />
          )}
          name="Weight"
          rules={{ required: 'Peso da questão é obrigatório' }}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputNormal
              value={value}
              label={errors?.question?.message || 'Digite a Pergunta'}
              onChange={onChange}
            />
          )}
          name="question"
          rules={{ required: 'Pergunta é obrigatória' }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Alternative onChange={onChange} errors={errors.alternatives?.message} />
          )}
          name="alternatives"
          rules={{ required: 'Adicione no mínimo duas alternativas' }}
        />

        <View style={styles.surface}>
          <ButtonDefault label="SALVAR" onClick={SubmitForm} />
        </View>
      </View>
    </>
  );
};

export default FormComponent;
