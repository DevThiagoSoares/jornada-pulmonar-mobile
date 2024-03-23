import * as React from 'react';
import { View, ScrollView } from 'react-native';
import img from 'src/assets/image/style3.png';

import FormComponent from './components/form-question';
import { ButtonDefault } from './components/ui';
import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

export function CreateQuestion() {
  return (
    <BackgroundScreen source={img} style={styles.backgroundImage} resizeMode="cover">
      <View style={{ display: 'flex', margin: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormComponent />
          <ButtonDefault label="Nova Questão" onClick={() => console.log('...')} />
        </ScrollView>
      </View>
    </BackgroundScreen>
  );
}
