import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { Alternative } from './alternative-question';
import { IconsForm } from './icons-form';
import { styledForm } from './styles';

interface FormData {
  titleUnit: string;
  question: string;
  Weight: string;
  alternatives: any;
}

export const FormComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  function SubmitForm() {
    handleSubmit(onSubmit)();
    console.log(errors);
  }

  return (
    <View style={styledForm.container}>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            style={styledForm.styleInputUnit}
            outlineColor="rgba(229, 204, 200, 0.5)"
            mode="outlined"
            onBlur={onBlur}
            error={!!errors.titleUnit}
            onChangeText={onChange}
            value={value}
            label={errors.titleUnit ? errors.titleUnit.message : 'Titulo da Unidade'}
          />
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
            <TextInput
              mode="outlined"
              outlineColor="#FFFFFF"
              inputMode="numeric"
              error={!!errors.Weight}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label={errors.Weight ? errors.Weight.message : 'Peso da Questão'}
            />
          )}
          name="Weight"
          rules={{ required: 'Peso da questão é obrigatório' }}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              mode="outlined"
              outlineColor="#FFFFFF"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label={errors.question ? errors.question.message : 'Digite a Pergunta'}
            />
          )}
          name="question"
          rules={{ required: 'Pergunta é obrigatória' }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange } }) => <Alternative onChange={onChange} />}
          name="alternatives"
        />

        <Button mode="contained" style={styledForm.button} onPress={SubmitForm}>
          Salvar
        </Button>
      </View>
    </View>
  );
};

export default FormComponent;
