import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, Text } from 'react-native-paper';

import { FormComponent } from './form-component';
import { styledEditQuestion } from './styles';

import { useQuestion } from '~/Shared/hooks/question.context';
import { questionsDto } from '~/screens/Student/Components/cards/card';

export function ListEditQuestion() {
  const { question } = useQuestion();
  const [listQuestion, setListQuestion] = useState<questionsDto[]>([]);

  useEffect(() => {
    setListQuestion(question);
  }, [question]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styledEditQuestion.container}>
        <View style={{ width: '100%', padding: 8 }}>
          {listQuestion.length > 0 ? (
            listQuestion.map((item: questionsDto, idx) => (
              <List.AccordionGroup key={idx}>
                <List.Accordion
                  key={idx}
                  title={`Questão ${idx + 1}`}
                  id="1"
                  rippleColor="#CD4C3E"
                  style={{ backgroundColor: 'rgba(222, 139, 129, 0.7)' }}
                  titleStyle={{ color: '#CD4C3E', fontWeight: '700' }}>
                  <FormComponent data={item} />
                </List.Accordion>
              </List.AccordionGroup>
            ))
          ) : (
            <Text>Não há questões para esta unidade</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
