import { Text } from 'react-native';
import { View } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import img from 'src/assets/image/Retângulo.png';

import { SelectPosition } from '../animations';
import { styledSelect } from '../animations/styles';
import { AlternativaCard } from '../cards/alternative-card';
import { CardDescription } from '../cards/card-description';
import { CarouselComponent } from '../componentImg';

export function ModalQuestion() {
  const options = [
    { value: 'a', description: 'test' },
    { value: 'b', description: 'test2' },
    { value: 'c', description: 'test3' },
    { value: 'd', description: 'test4' },
  ];
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardDescription />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styledSelect.title}>Clique no paciente para fazer a ausculta pulmonar</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 30, margin: 20 }}>
            <CarouselComponent titleImg="Titulo da imagem" img={img} />
            <CarouselComponent titleImg="Titulo da imagem" img={img} />
            <CarouselComponent titleImg="Titulo da imagem" img={img} />
          </View>
        </ScrollView>
        <View>
          <AlternativaCard options={options} />
        </View>
        <SelectPosition />
      </ScrollView>
    </View>
  );
}
