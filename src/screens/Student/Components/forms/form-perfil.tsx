import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styledForm } from './styles';

import { useAuth } from '~/Shared/Auth';
import AvatarPicker from '~/screens/Login/components/avatar';
import { styledUser } from '~/screens/Login/components/styles';

interface FormData {
  name: string;
  email: string;
  password: string;
  newKey: string;
}

export function FormPerfil() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuth();

  return (
    <View style={styledForm.container}>
      <AvatarPicker setImg={() => {}} userImg={user?.imageBase64 ?? null} />
      <Text>Adicione sua foto</Text>
      <View style={styledForm.boxForm}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styledUser.input}
              onBlur={onBlur}
              error={!!errors.name}
              onChangeText={onChange}
              value={user?.name}
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
              value={user?.email}
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
          rules={{ required: 'Campo senha obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styledUser.input}
              error={!!errors.password}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={!showPassword}
              label={errors.password?.message || 'Senha Atual'}
              mode="outlined"
              outlineColor="transparent"
              right={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#CD4C3E" />
                </TouchableOpacity>
              }
            />
          )}
          name="password"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{ required: 'Campo senha obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styledUser.input}
              error={!!errors.newKey}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={!showPassword}
              label={errors.newKey?.message || 'Nova senha'}
              mode="outlined"
              outlineColor="transparent"
              right={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={25} color="#CD4C3E" />
                </TouchableOpacity>
              }
            />
          )}
          name="newKey"
          defaultValue=""
        />

        <Button
          mode="contained"
          style={{ backgroundColor: '#CD4C3E' }}
          onPress={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </View>
    </View>
  );
}
