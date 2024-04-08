import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import image from 'src/assets/image/Grupo-6845.png';
import respostaCerta from 'src/assets/image/respostaInvalida.png';
import seta from 'src/assets/image/seta.png';

import { styledResponse } from '../style';

import { BackgroundScreen } from '~/components/screens/background-image';
import { RootStackParamList } from '~/navigation/Routes';
import { ListInfo } from '~/screens/Teacher/Components/List-Info/List-item-info';

type Props = StackScreenProps<RootStackParamList, 'ImageStepForm'>;

export function ErrorResponse() {
  const navigation = useNavigation<Props['navigation']>();

  return (
    <BackgroundScreen style={styledResponse.backgroundScreen} source={image} resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styledResponse.conatiner}>
          <Image source={respostaCerta} style={styledResponse.img} />
          <Text style={styledResponse.title}>Resposta Incorreta!</Text>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              padding: 15,
              borderRadius: 15,
              backgroundColor: '#F6A000',
            }}
            onPress={() => navigation.navigate('ModalQuestion')}>
            <Text style={{ color: '#ffff', fontSize: 15, fontWeight: '800' }}>Refazer</Text>
            <Ionicons name="arrow-forward-outline" size={25} color="#ffff" />
          </TouchableOpacity>
          <View style={styledResponse.time}>
            <View style={styledResponse.divider} />
            <Text style={styledResponse.timeText}>2m 12s - 10 pts</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 100,
              width: '70%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Image source={seta} style={{ width: 24, height: 64 }} />
            <Text style={{ color: '#ffff', fontSize: 20, fontWeight: '800' }}>Ranking</Text>
            <Image source={seta} style={{ width: 24, height: 64 }} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, maxHeight: 200, width: '80%' }}>
            <ListInfo name="Fernanda Maciel" points={9} position={4} />
            <ListInfo name="Teste1 Maciel" points={8} position={5} />
            <ListInfo name="Teste2 Maciel" points={7} position={6} />
          </ScrollView>
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
}
