import { Text } from 'react-native-paper';
import image from 'src/assets/image/Grupo-6845.png';

import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

export function ScreenResponse() {
  return (
    <BackgroundScreen style={styles.backgroundImage} source={image} resizeMode="cover">
      <Text> teste</Text>
    </BackgroundScreen>
  );
}
