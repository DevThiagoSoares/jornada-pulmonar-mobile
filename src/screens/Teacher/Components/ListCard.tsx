import React from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-animatable';
import { List } from 'react-native-paper';

import { CreateCard } from './createCard';
import { NotFoundData } from './notFoundData';
import { OptionsCard } from './optionsCard';
import { styledCard } from './styles';

export function ListCard() {
  return (
    <List.AccordionGroup>
      <List.Accordion
        title="Suas unidades"
        id="1"
        style={styledCard.listOptions}
        rippleColor="#CD4C3E"
        left={() => <List.Icon color="#CD4C3E" icon="plus" />}
        titleStyle={{ color: '#CD4C3E', fontWeight: '700' }}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 235 }}>
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
        left={() => <List.Icon color="#CD4C3E" icon="crown" />}
        titleStyle={{ color: '#CD4C3E', fontWeight: '700' }}>
        <NotFoundData />
      </List.Accordion>
    </List.AccordionGroup>
  );
}
