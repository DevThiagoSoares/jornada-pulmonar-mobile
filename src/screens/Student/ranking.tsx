import { ScrollView, View } from 'react-native';
import img from 'src/assets/image/Grupo-6845.png';
import goldCrown from 'src/assets/image/Grupo-7091.png';
import bronzeCrown from 'src/assets/image/bronze.png';
import silverCrown from 'src/assets/image/prata.png';

import { styles } from '../Login/styles';
import { AvatarGroup } from '../Teacher/Components/Avatar/avatarGroup';
import { styledCard } from '../Teacher/Components/Cards/styles';
import { ListInfo } from '../Teacher/Components/List-Info/List-item-info';

import { BackgroundScreen } from '~/components/screens/background-image';

export default function TabRanking() {
  return (
    <BackgroundScreen resizeMode="cover" source={img} style={styles.backgroundImage}>
      <ScrollView showsHorizontalScrollIndicator>
        <View style={{ display: 'flex', padding: 25 }}>
          <View style={styledCard.listContainer}>
            <AvatarGroup
              name="teste1"
              photo="https://picsum.photos/500"
              points={10}
              sizePhoto={54}
              crown={silverCrown}
            />
            <AvatarGroup
              crown={goldCrown}
              name="Fernanda"
              photo="https://picsum.photos/700"
              points={50}
              sizePhoto={84}
            />
            <AvatarGroup
              name="teste2"
              photo="https://picsum.photos/200"
              points={20}
              sizePhoto={54}
              crown={bronzeCrown}
            />
            {/* <NotFoundData /> */}
          </View>
          <View>
            <ListInfo name="Fernanda Maciel" points={9} position={4} />
            <ListInfo name="Teste1 Maciel" points={8} position={5} />
            <ListInfo name="Teste2 Maciel" points={7} position={6} />
          </View>
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
}
