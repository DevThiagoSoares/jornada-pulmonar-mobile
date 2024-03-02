import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import SignUpForm from '../creaetAccount';
import { styles } from '../styles';

import { UserProps, useAuth } from '~/Shared/Auth';
import { TypeUser } from '~/Shared/Enums/typeUser';
import ModalContainer from '~/components/modalContainer';

const AnimatedText = Animatable.createAnimatableComponent(Text);
type FormProps = {
  password: string;
  email: string;
};

export function FormLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const [showPassword, setShowPassword] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { validateUserAccess } = useAuth();

  const onSubmit = async (data: FormProps) => {
    const result: UserProps = {
      name: data.email,
      password: data.password,
      role: TypeUser.Teacher,
    };
    validateUserAccess(result);
  };

  const handleSignUpPress = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleLogin = () => {
    handleSubmit(onSubmit)();
    console.log({ errors });
  };
  return (
    <View style={styles.form}>
      <Image style={styles.image} source={require('src/assets/image/Grupo-6680.png')} />
      <AnimatedText
        animation="fadeIn"
        duration={1500}
        style={{ fontSize: 24, color: '#CD4C3E', fontWeight: 'bold' }}>
        Jornanda Pulmonar
      </AnimatedText>
      <Controller
        control={control}
        rules={{
          required: 'Campo email obrigatório',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Email inválido',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={errors.email ? styles.inputError : styles.ViewInput}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
            />
            <Icon name="envelope" size={20} color="#CD4C3E" />
          </View>
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      <View style={errors.password ? styles.inputError : styles.ViewInput}>
        <Controller
          control={control}
          rules={{ required: 'Campo senha obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={!showPassword}
              placeholder="Senha"
            />
          )}
          name="password"
          defaultValue=""
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#CD4C3E" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      <View style={styles.containerOptions}>
        <TouchableOpacity onPress={handleSignUpPress}>
          <Text style={styles.linkText}>Não tenho conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <ModalContainer onClose={handleSignUpPress} visible={isOpenModal}>
        <View style={{ height: 630, width: 320 }}>
          <SignUpForm />
        </View>
      </ModalContainer>
    </View>
  );
}
