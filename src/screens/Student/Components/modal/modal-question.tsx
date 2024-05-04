import { Text } from 'react-native';
import { View } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import imgHome from 'src/assets/image/Grupo-6845.png';
import img from 'src/assets/image/Retângulo.png';
import costa from 'src/assets/image/costa.png';
import lateral from 'src/assets/image/lateral.png';

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
  const options = question.alternatives.map((item: any) => {
    return { value: item.id, description: item.content };
  });
  const handlePress = (event: { nativeEvent: { locationX: any; locationY: any } }) => {
    const { locationX, locationY } = event.nativeEvent;
    /*  setLocationX(locationX - 170);
    setLocationY(locationY); */
  };
  return (
    <BackgroundScreen source={imgHome} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardDescription />
        <View style={styledModal.containerText}>
          <Text style={styledSelect.title}>Clique no paciente para fazer a ausculta pulmonar</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} onTouchStart={handlePress}>
          <View style={styledModal.carouselContainer}>
            <CarouselComponent titleImg="Tórax Anterior" img={img} idImg={1} />
            <CarouselComponent titleImg="Tórax Posterior" img={costa} idImg={2} />
            <CarouselComponent titleImg="Tórax Lateral" img={lateral} idImg={3} />
          </View>
        </ScrollView>
        <View>
          <AlternativaCard options={options} />
        </View>
        {/* <SelectPosition newLocationX={locationX} newLocationY={locationY} /> */}
      </ScrollView>
    </BackgroundScreen>
  );
}
