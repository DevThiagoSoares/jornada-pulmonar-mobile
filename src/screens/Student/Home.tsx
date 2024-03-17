import { View } from 'react-native-animatable';
import img from 'src/assets/image/Grupo-6845.png';

import { CardTemplate } from './Components/cards/card';
import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

export default function TabHome() {
  return (
    <BackgroundScreen resizeMode="cover" source={img} style={styles.backgroundImage}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 800,
          justifyContent: 'center',
        }}>
        <CardTemplate title="Enfermaria" totalQuest={10} totalFinishe={1} progress={0.1} />
      </View>
    </BackgroundScreen>
  );
}
