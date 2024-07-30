import { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { View } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import { MD2Colors } from 'react-native-paper';
import imgHome from 'src/assets/image/Grupo-6845.png';
import img from 'src/assets/image/Retângulo.png';
import costa from 'src/assets/image/costa.png';
import lateral from 'src/assets/image/lateral.png';
import { getUrlFile } from 'utils/downloadFile';

import { styledModal } from './style';
import { styledSelect } from '../animations/styles';
import { AlternativaCard } from '../cards/alternative-card';
import { CardDescription } from '../cards/card-description';
import { CarouselComponent } from '../componentImg';

import { useQuestion } from '~/Shared/hooks/question.context';
import { BackgroundScreen } from '~/components/screens/background-image';
import { styles } from '~/screens/Login/styles';

export function ModalQuestion() {
  const { question } = useQuestion();
  const [updateListAudios, setUpdateListAudios] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const options = question.alternatives.map((item: any) => {
    return { value: item.id, description: item.content };
  });
  useEffect(() => {
    handleListAudios();
  }, []);
  const arrayListAudios = question.audioUrl.length > 0 ? JSON.parse(question.audioUrl) : [];

  const handleListAudios = async () => {
    setLoading(true);
    if (arrayListAudios.length > 0) {
      try {
        const updatedArrayListAudios = await Promise.all(
          arrayListAudios.map(async (item: any) => {
            const refFile = item.audioUrl.split('/').pop();
            const newAudioUrl = await getUrlFile(refFile);
            return { audioUrl: newAudioUrl };
          })
        );
        setLoading(false);
        setUpdateListAudios(updatedArrayListAudios);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  console.log({ arrayListAudios });

  return (
    <BackgroundScreen source={imgHome} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardDescription />
        {loading && <ActivityIndicator animating color={MD2Colors.red800} size={120} />}
        {updateListAudios.length > 0 && (
          <>
            <View style={styledModal.containerText}>
              <Text style={styledSelect.title}>
                Clique no paciente para fazer a ausculta pulmonar
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styledModal.carouselContainer}>
                {updateListAudios.length > 0 && updateListAudios[0] && (
                  <CarouselComponent
                    titleImg="Tórax Anterior"
                    img={img}
                    idImg={1}
                    audioFile={updateListAudios[0].audioUrl}
                  />
                )}
                {updateListAudios.length > 0 && updateListAudios[1] && (
                  <CarouselComponent
                    titleImg="Tórax Posterior"
                    img={costa}
                    idImg={2}
                    audioFile={updateListAudios[1].audioUrl}
                  />
                )}
                {updateListAudios.length > 0 && updateListAudios[2] && (
                  <CarouselComponent
                    titleImg="Tórax Lateral"
                    img={lateral}
                    idImg={3}
                    audioFile={updateListAudios[2].audioUrl}
                  />
                )}
              </View>
            </ScrollView>
          </>
        )}
        <View>
          <AlternativaCard options={options} />
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
}
