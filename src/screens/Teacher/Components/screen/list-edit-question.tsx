import { View } from 'react-native';
import { List } from 'react-native-paper';

import { FormComponent } from './form-component';
import { styledEditQuestion } from './styles';

export function ListEditQuestion() {
  return (
    <View style={styledEditQuestion.container}>
      <View style={{ width: '100%', padding: 8 }}>
        <List.AccordionGroup>
          <List.Accordion
            title="Questão 1"
            id="1"
            rippleColor="#CD4C3E"
            style={{ backgroundColor: 'rgba(222, 139, 129, 0.7)' }}
            titleStyle={{ color: '#CD4C3E', fontWeight: '700' }}>
            <FormComponent />
          </List.Accordion>
        </List.AccordionGroup>
      </View>
    </View>
  );
}
