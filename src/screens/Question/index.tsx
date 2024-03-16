import * as React from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import img from 'src/assets/image/style3.png';

import FormComponent from './components/form-question';
import { styles } from '../Login/styles';
import { ButtonDefault } from './components/ui';

export function CreateQuestion() {
  return (
    <ImageBackground source={img} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ display: 'flex', flexDirection: 'column', padding: 20, gap: 10 }}>
          <FormComponent />
          <ButtonDefault label="Nova Questão" onClick={() => console.log('...')} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
