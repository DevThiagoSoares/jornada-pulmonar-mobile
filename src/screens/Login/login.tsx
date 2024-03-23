/* eslint-disable no-unused-expressions */
import React from 'react';
import { View } from 'react-native';
import image from 'src/assets/image/Grupo-6845.png';

import { FormLogin } from './components/formLogin';
import { styles } from './styles';

import { BackgroundScreen } from '~/components/screens/background-image';

const Login = () => {
  return (
    <View style={styles.container}>
      <BackgroundScreen style={styles.backgroundImage} source={image} resizeMode="cover">
        <FormLogin />
      </BackgroundScreen>
    </View>
  );
};

export default Login;
