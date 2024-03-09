import React from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-animatable';
import { List } from 'react-native-paper';
import goldCrown from 'src/assets/image/Grupo-7091.png';
import bronzeCrown from 'src/assets/image/bronze.png';
import silverCrown from 'src/assets/image/prata.png';

import { CreateCard } from './createCard';
import { OptionsCard } from './optionsCard';
import { styledCard } from './styles';
import { AvatarGroup } from '../Avatar/avatarGroup';
import { ListInfo } from '../List-Info/List-item-info';
//import { NotFoundData } from '../notFoundData';

export function ListCard() {
  return (
    <List.AccordionGroup>
      <List.Accordion
        title="Suas unidades"
        id="1"
        style={styledCard.listOptions}
        rippleColor="#CD4C3E"
        titleStyle={{ color: '#CD4C3E', fontWeight: '700' }}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 209 }}>
            <View style={styledCard.cardContainer}>
              <OptionsCard quantity={10} subTitle="ENFERMARIA" title="Unidade 1" />
              <OptionsCard quantity={10} subTitle="UPA" title="Unidade 2" />
              <OptionsCard quantity={10} subTitle="SPA" title="Unidade 3" />
              <CreateCard />
            </View>
          </ScrollView>
        </View>
      </List.Accordion>
      <List.Accordion
        title="Ranking"
        id="2"
        rippleColor="#CD4C3E"
        style={styledCard.listOptions}
        titleStyle={{ color: '#CD4C3E', fontWeight: '700' }}>
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
      </List.Accordion>
    </List.AccordionGroup>
  );
}
