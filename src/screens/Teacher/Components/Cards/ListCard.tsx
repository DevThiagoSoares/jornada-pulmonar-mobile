import React from 'react';
import { ScrollView, Text } from 'react-native';
import { View } from 'react-native-animatable';
import { List } from 'react-native-paper';
import goldCrown from 'src/assets/image/Grupo-7091.png';
import bronzeCrown from 'src/assets/image/bronze.png';
import silverCrown from 'src/assets/image/prata.png';

import { AvatarGroup } from '../Avatar/avatarGroup';
import { ListInfo } from '../List-Info/List-item-info';
import { NotFoundData } from '../notFoundData';
import { CreateCard } from './createCard';
import { OptionsCard } from './optionsCard';
import { styledCard } from './styles';

import { modulesDto } from '~/screens/Student/Home';

interface listProps {
  module: modulesDto[];
  listWinner: any[];
  listRanking: any[];
}

export function ListCard(props: listProps) {
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
    <View>
      <List.Accordion
        title="Suas unidades"
        id="1"
        style={[styledCard.listOptions]}
        titleStyle={{ color: '#CD4C3E', fontWeight: '700', fontSize: 16}}
        rippleColor="#CD4C3E"
        left={props => <List.Icon {...props} icon="book-open-variant" color="#CD4C3E" />}
        theme={{ colors: { background: 'tranparent' } }}>
        <View style={[styledCard.accordionContent]}>
          {props.module.length > 0 ? (
            <Text style={styledCard.unitsCount}>{props.module.length} unidades criadas</Text>
          ) : (
            <Text style={styledCard.noUnitsText}>Nenhuma unidade criada ainda</Text>
          )}
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 450}}>
            <View style={[styledCard.cardContainer]}>
              {props.module.length > 0 ? (
                props.module.map((item: any, idx: number) => (
                  <OptionsCard
                    key={idx}
                    quantity={item.questionsCount}
                    title={item.title}
                    data={item}
                    index={idx}
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
        style={[styledCard.listOptions]}
        titleStyle={{ color: '#CD4C3E', fontWeight: '700', fontSize: 16}}
        rippleColor="#CD4C3E"
        left={props => <List.Icon {...props} icon="trophy" color="#CD4C3E" />}
        theme={{ colors: { background: 'tranparent' } }}>
        <View style={[styledCard.accordionContent]}>
          <View style={[styledCard.listContainer]}>
          {props.listWinner.length > 0 && (
            <>
              {props.listWinner.map((winner, index) => (
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
          <View style={{ marginBottom: 10}}>
            {props.listRanking.length > 0 ? (
              props.listRanking.map((item: any, idx) => (
                <ListInfo key={idx} name={item?.name} points={item.score} position={idx} />
              ))
            ) : (
              <NotFoundData />
            )}
          </View>
        </View>
      </List.Accordion>
    </View>
  );
}
