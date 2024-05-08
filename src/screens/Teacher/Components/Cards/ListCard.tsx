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
import { getModules } from '~/Shared/api/services/modules/modules';
import { Ranking } from '~/Shared/api/services/users';
import { rankingDto } from '~/screens/Student/ranking';

export function ListCard() {
  const [listRanking, setListRanking] = useState([]);
  const [module, setModule] = useState([]);
  const [listWinner, setListWinner] = useState<rankingDto[]>([]);

  const getUser = async () => {
    const response = await Ranking();
    const newList = response.data.map((item: any) => {
      if (item.role !== TypeUser.Teacher && item.score > 0) {
        return item;
      }
    });
    const sortedRanking = response.data
      .filter((item: rankingDto) => item.score > 0 && item.role !== 'teacher') // Filtra os itens com score maior que zero
      .sort((a: rankingDto, b: rankingDto) => b.score - a.score); // Ordena pelo score decrescente

    const winners = sortedRanking.slice(0, 3);
    setListWinner(winners);

    setListRanking(newList.filter(Boolean));
  };
  const getModule = async () => {
    const response = await getModules();
    setModule(response.data);
  };
  useEffect(() => {
    getUser();
    getModule();
  }, []);

  const getCrownImage = (index: number) => {
    switch (index) {
      case 0:
        return goldCrown;
      case 1:
        return silverCrown;
      case 2:
        return bronzeCrown;
      default:
        return null;
    }
  };

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
              {module.length > 0 ? (
                module.map((item: any, idx: number) => (
                  <OptionsCard
                    key={idx}
                    quantity={item.questionsCount}
                    subTitle={item.title}
                    title={`Unidade ${idx + 1}`}
                  />
                ))
              ) : (
                <></>
              )}
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
          {listWinner.length > 0 && (
            <>
              {listWinner.map((winner, index) => (
                <AvatarGroup
                  key={index}
                  name={winner.name}
                  photo={winner.imageBase64}
                  points={winner.score}
                  sizePhoto={54}
                  crown={getCrownImage(index)}
                />
              ))}
            </>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
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
