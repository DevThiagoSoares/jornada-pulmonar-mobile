import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import AvatarPicker from './components/avatar';
import { RadioGroup } from './components/radioGroup';
import { styledRadio, styledUser } from './components/styles';

import { UserProps, useAuth } from '~/Shared/Auth';
import { TypeUser } from '~/Shared/Enums/typeUser';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const { validateUserAccess } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const optionsCheckBox = [
    { value: TypeUser.Student, label: 'Sou aluno' },
    { value: TypeUser.Teacher, label: 'Sou professor' },
  ];

  const onSubmit = (data: FormData) => {
    if (selectedOption !== '') {
      const result: UserProps = {
        name: data.name,
        password: data.name,
        role: selectedOption,
      };
      validateUserAccess(result);
    } else {
      setIsValidInput(true);
    }
  };
  const handleCreateUser = () => {
    handleSubmit(onSubmit)();
    console.log('errors', errors);
  };

  return (
    <View style={styledUser.container}>
      <AvatarPicker />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styledUser.input}
            onBlur={onBlur}
            error={!!errors.name}
            onChangeText={onChange}
            value={value}
            label={errors.name?.message || 'Nome'}
            mode="outlined"
            outlineColor="transparent"
          />
        )}
        name="name"
        rules={{
          required: 'Nome é obrigatório',
        }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styledUser.input}
            onBlur={onBlur}
            error={!!errors.email}
            onChangeText={onChange}
            value={value}
            label={errors.email?.message || 'Email'}
            mode="outlined"
            outlineColor="transparent"
          />
        )}
        name="email"
        rules={{
          required: 'Email é obrigatório',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Email inválido',
          },
        }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styledUser.input}
            onBlur={onBlur}
            error={!!errors.password}
            onChangeText={onChange}
            value={value}
            label={errors.password?.message || 'Senha'}
            secureTextEntry
            mode="outlined"
            outlineColor="transparent"
          />
        )}
        name="password"
        rules={{
          required: 'Senha é obrigatório',
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message:
              'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número',
          },
        }}
        defaultValue=""
      />
      {errors.password && <Text style={styledUser.error}>{errors.password.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styledUser.input}
            error={!!errors.confirmPassword}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label={errors.confirmPassword?.message || 'Confirme a senha'}
            secureTextEntry
            outlineColor="transparent"
            mode="outlined"
          />
        )}
        name="confirmPassword"
        rules={{
          required: 'Confirme a senha',
          validate: (value) => value === getValues('password') || 'Senhas não combinam',
        }}
        defaultValue=""
      />

      <View style={styledRadio.container}>
        <RadioGroup
          options={optionsCheckBox}
          setValue={setSelectedOption}
          value={selectedOption}
          isValidInput={isValidInput}
        />
      </View>

      <TouchableOpacity style={styledUser.button} onPress={handleCreateUser}>
        <Text style={styledUser.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;
