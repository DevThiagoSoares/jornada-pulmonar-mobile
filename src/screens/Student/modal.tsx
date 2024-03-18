import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import img from 'src/assets/image/Grupo-6845.png';

import { Divider } from './Components/unit/divider';
import { UnitCard } from './Components/unit/unit-card';
import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

export default function Modal() {
  return (
    <BackgroundScreen source={img} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ display: 'flex', flexDirection: 'column', margin: 30 }}>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
          <UnitCard question="Questão 1" finishe="Concluída" level="1" />
          <Divider />
          <UnitCard question="Questão 2" finishe="Não iniciada" level="2" />
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
}
