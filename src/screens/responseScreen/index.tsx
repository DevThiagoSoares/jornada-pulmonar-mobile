import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import image from 'src/assets/image/Grupo-6845.png';
import goldCrown from 'src/assets/image/Grupo-7091.png';
import respostaCerta from 'src/assets/image/respostaCerta.png';
import seta from 'src/assets/image/seta2.png';

import { AvatarImg } from './components/avatar';
import { styledResponse } from './style';

import { BackgroundScreen } from '~/components/screens/background-image';
import { RootStackParamList } from '~/navigation/Routes';

type Props = StackScreenProps<RootStackParamList, 'ImageStepForm'>;

export function ScreenResponse() {
  const navigation = useNavigation<Props['navigation']>();

  return (
    <BackgroundScreen style={styledResponse.backgroundScreen} source={image} resizeMode="cover">
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
            <View style={styledResponse.containerPts}>
              <Text style={styledResponse.textPts}>110 pontos</Text>
              <AvatarImg photo="https://picsum.photos/500" sizePhoto={54} crown={goldCrown} />
            </View>
            <Image source={seta} style={{ width: 24, height: 64 }} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '50%',
              alignItems: 'center',
            }}>
            <Image source={seta} style={{ width: 24, height: 64 }} />
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                padding: 15,
                borderRadius: 15,
                backgroundColor: '#F6A000',
              }}
              onPress={() => navigation.navigate('Modal')}>
              <Text style={{ color: '#ffff', fontSize: 15, fontWeight: '800' }}>Próxima</Text>
              <Ionicons name="arrow-forward-outline" size={25} color="#ffff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
}
