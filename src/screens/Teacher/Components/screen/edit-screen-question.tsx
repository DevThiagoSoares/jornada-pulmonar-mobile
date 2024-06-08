import { View } from 'react-native-animatable';
import { IconButton, List, MD3Colors } from 'react-native-paper';

import { ListEditQuestion } from './list-edit-question';
import { styledEditQuestion } from './styles';
import { styledCard } from '../Cards/styles';

import { BackgroundScreen } from '~/components/screens/background-image';
import { styles } from '~/screens/Login/styles';

export function EditScreenQuestion() {
  return (
    <BackgroundScreen
      style={styles.backgroundImage}
      source={require('src/assets/image/image-6845.png')}
      resizeMode="cover">
      <ListEditQuestion />
    </BackgroundScreen>
  );
}
