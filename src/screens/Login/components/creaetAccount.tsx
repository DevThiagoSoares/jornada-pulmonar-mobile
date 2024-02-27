import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import CheckBox from './CheckBox';
import AvatarPicker from './avatar';
import { styledUser } from './styles';

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
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const optionsCheckBox = [
    { value: TypeUser.Student, label: 'Sou aluno' },
    { value: TypeUser.Teacher, label: 'Sou professor' },
  ];

  const onSubmit = (data: FormData) => {
    console.log('entrou', data);
    if (selectedOption !== null && typeof selectedOption !== 'number') {
      const result: UserProps = {
        name: data.name,
        password: data.name,
        role: selectedOption,
      };
      validateUserAccess(result);
    }
  };

  const toggleCheckbox = (value: number | string | null) => {
    if (selectedOption === value) {
      setSelectedOption(null);
    } else {
      setSelectedOption(value);
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
            style={errors.email ? styledUser.inputError : styledUser.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nome"
          />
        )}
        name="name"
        rules={{
          required: 'Nome é obrigatório',
        }}
        defaultValue=""
      />
      {errors.name && <Text style={styledUser.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={errors.email ? styledUser.inputError : styledUser.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
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
      {errors.email && <Text style={styledUser.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={errors.password ? styledUser.inputError : styledUser.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Senha"
            secureTextEntry
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
            style={errors.confirmPassword ? styledUser.inputError : styledUser.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Confirme a senha"
            secureTextEntry
          />
        )}
        name="confirmPassword"
        rules={{
          required: 'Confirme a senha',
          validate: (value) => value === getValues('password') || 'Senhas não combinam',
        }}
        defaultValue=""
      />
      {errors.confirmPassword && (
        <Text style={styledUser.error}>{errors.confirmPassword.message}</Text>
      )}

      <View style={{ flexDirection: 'column', flexWrap: 'wrap', gap: 12 }}>
        {optionsCheckBox.map((item) => (
          <CheckBox
            key={item.value}
            description={item.label}
            toggleCheckbox={() => toggleCheckbox(item.value)}
            isChecked={item.value === selectedOption}
            itemId={item.value}
            selectedItemId={selectedOption}
            setSelectedItemId={setSelectedOption}
          />
        ))}
      </View>

      <TouchableOpacity style={styledUser.button} onPress={handleCreateUser}>
        <Text style={styledUser.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;
