import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import CheckBox from './CheckBox';
import AvatarPicker from './avatar';
import { styledUser } from './styles';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const optionsCheckBox = [
    { value: 1, label: 'Sou aluno' },
    { value: 2, label: 'Sou professor' },
  ];
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);

  const toggleCheckbox = (value: number | string | null) => {
    if (selectedOption === value) {
      setSelectedOption(null); // Desmarcar o item se ele já estiver selecionado
    } else {
      setSelectedOption(value); // Selecionar o item se não estiver selecionado
    }
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
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            secureTextEntry
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
      {errors.password && <Text style={styledUser.error}>{errors.password.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styledUser.input}
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
              'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
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
          validate: (value) =>
            value === control._defaultValues.password || 'The passwords do not match',
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

      <TouchableOpacity style={styledUser.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styledUser.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;
