import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import imgHome from 'src/assets/image/Grupo-6845.png';
import img from 'src/assets/image/Retângulo.png';

import { styledModal } from './style';
import { SelectPosition } from '../animations';
import { styledSelect } from '../animations/styles';
import { AlternativaCard } from '../cards/alternative-card';
import { CardDescription } from '../cards/card-description';
import { CarouselComponent } from '../componentImg';

import { BackgroundScreen } from '~/components/screens/background-image';
import { styles } from '~/screens/Login/styles';

export function ModalQuestion() {
  const [locationX, setLocationX] = useState<number>(0);
  const [locationY, setLocationY] = useState<number>(0);
  const [isActive, setActive] = useState(false);
  const defaultPosition = {
    latX: 142.4761962890625,
    lgnY: 155.38987731933594,
  };

  const options = [
    { value: 'a', description: 'test' },
    { value: 'b', description: 'test2' },
    { value: 'c', description: 'test3' },
    { value: 'd', description: 'test4' },
  ];
  const handlePress = (event: { nativeEvent: { locationX: any; locationY: any } }) => {
    const { locationX, locationY } = event.nativeEvent;
    console.log({ locationX, locationY });
    setLocationX(locationX - 170);
    setLocationY(locationY);
  };
  const handlePosition = () => {
    /*  setLocationX(defaultPosition.latX - 150);
    setLocationY(defaultPosition.lgnY - 50); */
    setActive(!isActive);
  };
  return (
    <BackgroundScreen source={imgHome} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardDescription />
        <View style={styledModal.containerText}>
          <Text style={styledSelect.title}>Clique no paciente para fazer a ausculta pulmonar</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} onTouchStart={handlePress}>
          <TouchableOpacity
            onPress={handlePosition}
            style={[
              styledModal.iconImg,
              { left: defaultPosition.latX, top: defaultPosition.lgnY },
            ]}>
            {defaultPosition && isActive ? (
              <Ionicons name="volume-high-outline" size={20} color="#CD4C3E" />
            ) : (
              <Ionicons name="volume-mute-outline" size={20} color="#CD4C3E" />
            )}
          </TouchableOpacity>
          <View style={styledModal.carouselContainer}>
            <CarouselComponent titleImg="Titulo da imagem" img={img} />
            <CarouselComponent titleImg="Titulo da imagem" img={img} />
            <CarouselComponent titleImg="Titulo da imagem" img={img} />
          </View>
        </ScrollView>
        <View>
          <AlternativaCard options={options} />
        </View>
        <SelectPosition newLocationX={locationX} newLocationY={locationY} />
      </ScrollView>
    </BackgroundScreen>
  );
}
