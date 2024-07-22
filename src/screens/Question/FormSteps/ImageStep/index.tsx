/* eslint-disable import/order */
import { ImageBackground, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import ImgTórax1 from 'src/assets/image/Retângulo.png';
import imgCosta from 'src/assets/image/costa.png';
import imgLateral from 'src/assets/image/lateral.png';
import img from 'src/assets/image/style3.png';

import UploadImg from './components/uploadImg';
import { styledImageStep } from './style';
import { ButtonDefault } from '../../components/ui';
import { AudioImg } from '../AudioStep';
import { styles } from '~/screens/Login/styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigation/Routes';
import { useNavigation } from '@react-navigation/native';
import { useData } from '~/Shared/hooks/audio.context';
import { useEffect, useState } from 'react';

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

export const ImageStep: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const [listAudios, setListAudios] = useState<any>([]);
  const { data } = useData();

  useEffect(() => {
    if (data?.audioUrl && typeof data?.audioUrl === 'string' && data?.audioUrl.length > 0) {
      console.log(data);
      setListAudios(JSON.parse(data.audioUrl));
    }
  }, []);

  return (
    <ImageBackground source={img} style={styles.backgroundImage} resizeMode="cover">
      <View style={{ display: 'flex', flexDirection: 'column', padding: 20, gap: 10 }}>
        <View style={styledImageStep.container}>
          <Text style={styledImageStep.subTitle1}>Adicionando Imagens</Text>
        </View>
        <View style={styledImageStep.card}>
          <Text style={styledImageStep.textImg}>Imagem Principal:</Text>
          <UploadImg />
          <Text style={styledImageStep.subTitle2}>
            Clique em um ponto da imagem abaixo para adicionar um áudio
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styledImageStep.carrousel}>
              <AudioImg
                titleImg="Tórax Anterior"
                img={ImgTórax1}
                audioUrl={listAudios[0]?.audioUrl}
              />
              <AudioImg
                titleImg="Tórax Posterior"
                img={imgCosta}
                audioUrl={listAudios[1]?.audioUrl}
              />
              <AudioImg
                titleImg="Tórax Lateral"
                img={imgLateral}
                audioUrl={listAudios[2]?.audioUrl}
              />
            </View>
          </ScrollView>
          {/* <View style={styledImageStep.buttonContainer}>
            <View style={styledImageStep.buttonFormat}>
              <ButtonDefault label="SALVAR" onClick={() => navigation.navigate('TabNavigator')} />
            </View>
          </View> */}
        </View>
      </View>
    </ImageBackground>
  );
};
