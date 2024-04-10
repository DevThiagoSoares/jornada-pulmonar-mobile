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
import { ListAudio } from '~/components/Audio/list-audio';

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

export const ImageStep: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
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
              <ButtonDefault label="SALVAR" onClick={() => navigation.navigate('TabNavigator')} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
