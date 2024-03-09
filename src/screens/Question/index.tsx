import * as React from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import img from 'src/assets/image/style3.png';

import FormComponent from './components/form-question';
import { styles } from '../Login/styles';

export function CreateQuestion() {
  return (
    <ImageBackground source={img} style={styles.backgroundImage} resizeMode="cover">
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormComponent />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
