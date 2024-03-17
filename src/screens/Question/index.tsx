import * as React from 'react';
import { View, ScrollView } from 'react-native';
import img from 'src/assets/image/style3.png';

import FormComponent from './components/form-question';
import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

export function CreateQuestion() {
  return (
    <BackgroundScreen source={img} style={styles.backgroundImage} resizeMode="cover">
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormComponent />
        </ScrollView>
      </View>
    </BackgroundScreen>
  );
}
