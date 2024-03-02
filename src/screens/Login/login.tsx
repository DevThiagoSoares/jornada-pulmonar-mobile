/* eslint-disable no-unused-expressions */
import React from 'react';
import { View, ImageBackground } from 'react-native';
import image from 'src/assets/image/Grupo-6845.png';

import { FormLogin } from './components/formLogin';
import { styles } from './styles';

const Login = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={image} resizeMode="cover">
        <FormLogin />
      </ImageBackground>
    </View>
  );
};

export default Login;
