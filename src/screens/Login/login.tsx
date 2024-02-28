/* eslint-disable no-unused-expressions */
import { StackScreenProps } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome'; // Exemplo usando ícones FontAwesome, mas você pode usar qualquer conjunto de ícones suportado
import image from 'src/assets/image/Grupo-6845.png';

import CheckBox from './components/CheckBox';
import SignUpForm from './creaetAccount';
import { styles } from './styles';

import { useAuth, UserProps } from '~/Shared/Auth';
import { TypeUser } from '~/Shared/Enums/typeUser';
import ModalContainer from '~/components/modalContainer';
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

  const [isChecked, setIsChecked] = useState<number | string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { validateUserAccess } = useAuth();
  const optionsCheckBox = [
    {
      label: 'Eu aceito os termos de uso',
      value: 1,
    },
  ];

  const toggleCheckbox = (value: number | string | null) => {
    if (isChecked === value) {
      setIsChecked(null);
    } else {
      setIsChecked(value);
    }
  };

  async function handleNotification() {
    const { status } = await Notifications.getPermissionsAsync();
    console.log('status', status);
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        return;
      }
    }
    const { data: token } = await Notifications.getExpoPushTokenAsync({
      projectId: `${process.env.EXPO_PUBLIC_PROJECT_ID}`,
    });
    console.log('Expo Push Token:', token);
  }

  const onSubmit = async (data: FormProps) => {
    if (isChecked) {
      const result: UserProps = {
        name: data.email,
        password: data.password,
        role: TypeUser.Teacher,
      };
      validateUserAccess(result);
    } else {
      handleNotification();
    }
  };

  const handleSignUpPress = () => {
    //navigation.navigate('Modal');
    setIsOpenModal(!isOpenModal);
  };
  const handleLogin = () => {
    handleSubmit(onSubmit)();
    console.log({ errors });
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={image} resizeMode="cover">
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
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={styles.linkText}>Não tenho conta</Text>
          </TouchableOpacity>
          {optionsCheckBox.map((item) => (
            <CheckBox
              key={item.value}
              isChecked={item.value === isChecked}
              toggleCheckbox={() => toggleCheckbox(item.value)}
              description={item.label}
              itemId={item.value}
              selectedItemId={item.value}
              setSelectedItemId={() => setIsChecked(item.value)}
            />
          ))}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <ModalContainer onClose={handleSignUpPress} visible={isOpenModal}>
            <View style={{ height: 650, width: 320 }}>
              <SignUpForm />
            </View>
          </ModalContainer>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
