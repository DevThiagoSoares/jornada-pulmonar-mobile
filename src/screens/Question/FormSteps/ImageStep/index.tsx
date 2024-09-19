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
import { AudioImg } from '../AudioStep';
import { styles } from '~/screens/Login/styles';

import { useData } from '~/Shared/hooks/audio.context';
import { useEffect, useState } from 'react';

export const ImageStep: React.FC = () => {
  const [listAudios, setListAudios] = useState<any>([]);
  const { data, setData } = useData();

  useEffect(() => {
    if (data?.audioUrl && typeof data?.audioUrl === 'string' && data?.audioUrl.length > 0) {
      setListAudios(JSON.parse(data.audioUrl));
    }
  }, []);

  const handleAudioSelected = (audioFile: string) => {
    if (!listAudios.some((audio: { audioUrl: string }) => audio.audioUrl === audioFile)) {
      setListAudios((prevListAudios: any) => [...prevListAudios, { audioUrl: audioFile }]);
    }
    listAudios.lenght === 0 && setListAudios({ ...listAudios, audioUrl: audioFile });
  };
  useEffect(() => {
    setData({...data,audioUrl:listAudios});
  }, [listAudios]);


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
                handleAudioSelected={handleAudioSelected}
              />
              <AudioImg
                titleImg="Tórax Posterior"
                img={imgCosta}
                audioUrl={listAudios[1]?.audioUrl}
                handleAudioSelected={handleAudioSelected}
              />
              <AudioImg
                titleImg="Tórax Lateral"
                img={imgLateral}
                audioUrl={listAudios[2]?.audioUrl}
                handleAudioSelected={handleAudioSelected}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};
