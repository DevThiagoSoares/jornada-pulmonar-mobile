import React, { useEffect, useState } from 'react';
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
import { NotFoundData } from '../notFoundData';

import { TypeUser } from '~/Shared/Enums/typeUser';
import { Ranking } from '~/Shared/api/services/users';

export function ListCard() {
  const [listRanking, setListRanking] = useState([]);
  const getUser = async () => {
    const response = await Ranking();
    const newList = response.data.map((item: any) => {
      if (item.role !== TypeUser.Teacher && item.score > 0) {
        return item;
      }
    });
    setListRanking(newList.filter(Boolean));
  };
  useEffect(() => {
    getUser();
  }, []);

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
          {listRanking.length > 0 && (
            <>
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
            </>
          )}
        </View>
        <View>
          {listRanking.length > 0 ? (
            listRanking.map((item: any, idx) => (
              <ListInfo key={idx} name={item?.name} points={item.score} position={idx} />
            ))
          ) : (
            <NotFoundData />
          )}
        </View>
      </List.Accordion>
    </List.AccordionGroup>
  );
}
