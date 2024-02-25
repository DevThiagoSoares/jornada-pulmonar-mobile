/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import image from 'src/assets/image/Grupo-6845.png';

import { styles } from './styles';

import { RootStackParamList } from '~/navigation';

const AnimatedText = Animatable.createAnimatableComponent(Text);

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

type FormProps = {
  password: string;
  email: string;
};

const Login = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };

  const handleSignUpPress = () => {
    navigation.navigate('Modal');
  };

  const handleLogin = () => {
    handleSubmit(onSubmit)();
    console.log(errors);
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={image}>
      <View style={styles.container}>
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
              required: 'Campo obrigatório',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email inválido',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.email ? styles.inputError : styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          <Controller
            control={control}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.password ? styles.inputError : styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                placeholder="Senha"
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={styles.linkText}>Não tenho conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
