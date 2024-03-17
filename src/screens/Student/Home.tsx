import { Text, View } from 'react-native';
import img from 'src/assets/image/Grupo-6845.png';

import EditScreenInfo from '../../components/screens/edit-screen-info';
import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

export default function TabHome() {
  return (
    <BackgroundScreen resizeMode="cover" source={img} style={styles.backgroundImage}>
      <View>
        <Text>Tab One</Text>
        <View />
        <EditScreenInfo path="src/screens/one.tsx" />
      </View>
    </BackgroundScreen>
  );
}
