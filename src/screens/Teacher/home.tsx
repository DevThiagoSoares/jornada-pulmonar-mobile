import { View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { ListCard } from './Components/ListCard';
import { DescriptionCard } from './Components/descriptionCard';
import { styledHometeacher } from './styles';
import { styles } from '../Login/styles';

const PageTeacher = () => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('src/assets/image/image-6845.png')}>
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
    </ImageBackground>
  );
};

export default PageTeacher;
