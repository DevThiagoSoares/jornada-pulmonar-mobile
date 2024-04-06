import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import image from 'src/assets/image/Grupo-6845.png';
import goldCrown from 'src/assets/image/Grupo-7091.png';
import respostaCerta from 'src/assets/image/respostaCerta.png';
import seta from 'src/assets/image/seta2.png';

import { AvatarImg } from './components/avatar';
import { styledResponse } from './style';
import { styles } from '../Login/styles';

import { BackgroundScreen } from '~/components/screens/background-image';

export function ScreenResponse() {
  return (
    <BackgroundScreen style={styles.backgroundImage} source={image} resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styledResponse.conatiner}>
          <Image source={respostaCerta} style={styledResponse.img} />
          <View style={styledResponse.points}>
            <Text style={styledResponse.pointText}>+ 10 pontos</Text>
          </View>
          <Text style={styledResponse.title}>Resposta Certa ! </Text>
          <View style={styledResponse.time}>
            <View style={styledResponse.divider} />
            <Text style={styledResponse.timeText}>2m 12s - 10 pts</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 150,
              width: '70%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '800',
                  fontSize: 18,
                  padding: 12,
                  backgroundColor: 'rgba(205, 107, 95, 0.5)',
                  borderRadius: 20,
                }}>
                110 pontos
              </Text>
              <AvatarImg photo="https://picsum.photos/500" sizePhoto={54} crown={goldCrown} />
            </View>
            <Image source={seta} style={{ width: 24, height: 64 }} />
          </View>
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
}
