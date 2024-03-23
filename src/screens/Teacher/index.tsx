import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { ListCard } from './Components/Cards/ListCard';
import { DescriptionCard } from './Components/Cards/descriptionCard';
import { styledHometeacher } from './styles';
import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

const PageTeacher = () => {
  return (
    <BackgroundScreen
      style={styles.backgroundImage}
      source={require('src/assets/image/image-6845.png')}
      resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styledHometeacher.container}>
          <Text style={styledHometeacher.title}>Bem-Vindo !</Text>
          <View style={styledHometeacher.card}>
            <DescriptionCard />
          </View>
          <View style={styledHometeacher.Boxseparator}>
            <View style={styledHometeacher.separator} />
          </View>
          <View style={{ display: 'flex', width: '100%' }}>
            <ListCard />
          </View>
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
};

export default PageTeacher;
