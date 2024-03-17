import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Alternative } from './alternative-question';
import { IconsForm } from './icons-form';
import { styledForm } from './styles';
import { ButtonDefault, ButtonLink, InputNormal, InputTitle } from './ui';
import { Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  surface: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    shadowColor: 'transparent',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#CD4C3E',
    borderRadius: 16,
    padding: 10,
  },
  buttonLink: {
    flex: 1,
    margin: 5,
    borderRadius: 16,
    padding: 10,
  },
});

export const FormComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
        <IconsForm />
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
          render={({ field: { onBlur, onChange, value } }) => (
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

        <Surface style={styles.surface}>
          <ButtonLink label="VOLTAR" onClick={() => console.log('...')} />
          <ButtonDefault label="SALVAR" onClick={SubmitForm} />
        </Surface>
      </View>
    </>
  );
};

export default FormComponent;
