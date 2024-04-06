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

import { ListAudio } from '~/components/Audio/list-audio';
import { styles } from '~/screens/Login/styles';

export const ImageStep: React.FC = () => {
  return (
    <ImageBackground source={img} style={styles.backgroundImage} resizeMode="cover">
      <View style={{ display: 'flex', flexDirection: 'column', padding: 20, gap: 10 }}>
        <View style={styledImageStep.container}>
          <Text style={styledImageStep.subTitle1}>Adicionando Imagens</Text>
          <ListAudio />
        </View>
        <View style={styledImageStep.card}>
          <Text style={styledImageStep.textImg}>Imagem Principal:</Text>
          <UploadImg />
          <Text style={styledImageStep.subTitle2}>
            Clique em um ponto da imagem abaixo para adicionar um áudio
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styledImageStep.carrousel}>
              <AudioImg titleImg="Tórax Anterior" img={ImgTórax1} />
              <AudioImg titleImg="Tórax Anterior" img={imgCosta} />
              <AudioImg titleImg="Tórax Lateral" img={imgLateral} />
            </View>
          </ScrollView>
          <View style={styledImageStep.buttonContainer}>
            <View style={styledImageStep.buttonFormat}>
              <ButtonDefault label="SALVAR" onClick={() => {}} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
