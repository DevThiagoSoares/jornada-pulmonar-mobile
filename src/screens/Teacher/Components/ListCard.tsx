import { List } from 'react-native-paper';

import { CreateCard } from './createCard';
import { NotFoundData } from './notFoundData';
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
        <CreateCard />
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
