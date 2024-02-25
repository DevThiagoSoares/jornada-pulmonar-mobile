import { StackScreenProps } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome'; // Exemplo usando ícones FontAwesome, mas você pode usar qualquer conjunto de ícones suportado
import image from 'src/assets/image/Grupo-6845.png';

import CheckBox from './components/CheckBox';
import SignUpForm from './components/creaetAccount';
import { styles } from './styles';

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

  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
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

  const onSubmit = (data: FormProps) => {
    if (isChecked) {
      console.log('Form Data:', data);
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
              <View style={errors.email ? styles.inputError : styles.input}>
                <TextInput
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
          <View style={errors.password ? styles.inputError : styles.input}>
            <Controller
              control={control}
              rules={{ required: 'Campo obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
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
          <CheckBox
            isChecked={isChecked}
            toggleCheckbox={toggleCheckbox}
            description="Eu aceito os termos de uso"
            itemId={1}
            selectedItemId={1}
            setSelectedItemId={() => {}}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <ModalContainer onClose={handleSignUpPress} visible={isOpenModal}>
            <View style={{ height: 500, width: 320 }}>
              <SignUpForm />
            </View>
          </ModalContainer>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
