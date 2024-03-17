import { View } from 'react-native';
import img from 'src/assets/image/Grupo-6845.png';

import { FormPerfil } from './Components/forms/form-perfil';
import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

export default function TabPerfil() {
  return (
    <BackgroundScreen resizeMode="cover" source={img} style={styles.backgroundImage}>
      <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', top: 40 }}>
        <FormPerfil />
      </View>
    </BackgroundScreen>
  );
}
