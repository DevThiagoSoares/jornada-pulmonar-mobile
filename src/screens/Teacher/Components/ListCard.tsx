import { List } from 'react-native-paper';

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
        <List.Item title="Item 1" />
      </List.Accordion>
      <List.Accordion
        title="Ranking"
        id="2"
        rippleColor="#CD4C3E"
        style={styledCard.listOptions}
        left={() => <List.Icon color="#CD4C3E" icon="crown" />}
        titleStyle={{ color: '#CD4C3E', fontWeight: '700' }}>
        <List.Item title="Item 2" />
      </List.Accordion>
    </List.AccordionGroup>
  );
}
