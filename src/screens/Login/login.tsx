/* eslint-disable no-unused-expressions */
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome'; // Exemplo usando ícones FontAwesome, mas você pode usar qualquer conjunto de ícones suportado
import image from 'src/assets/image/Grupo-6845.png';

import { RadioGroup } from './components/radioGroup';
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

  const [isChecked, setIsChecked] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { validateUserAccess } = useAuth();
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const optionsCheckBox = [
    {
      value: '1',
      label: 'Eu aceito os termos de uso',
    },
  ];
  const onSubmit = async (data: FormProps) => {
    if (isChecked) {
      const result: UserProps = {
        name: data.email,
        password: data.password,
        role: TypeUser.Teacher,
      };
      validateUserAccess(result);
    } else {
      // handleNotification();
      setIsValidInput(true);
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
          <View style={styles.containerOptions}>
            <TouchableOpacity onPress={handleSignUpPress}>
              <Text style={styles.linkText}>Não tenho conta</Text>
            </TouchableOpacity>
            <RadioGroup
              options={optionsCheckBox}
              setValue={setIsChecked}
              value={isChecked}
              isValidInput={isValidInput}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <ModalContainer onClose={handleSignUpPress} visible={isOpenModal}>
            <View style={{ height: 580, width: 320 }}>
              <SignUpForm />
            </View>
          </ModalContainer>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
