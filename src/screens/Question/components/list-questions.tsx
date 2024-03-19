import { useState } from 'react';
import { View } from 'react-native';
import { Button, List, TextInput } from 'react-native-paper';

import FormComponent from './form-question';
import { styledForm } from '../styles';

export function ListQuestions() {
  const [questions, setQuestions] = useState([{ id: 1 }]);
  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId }]);
  };
  return (
    <View style={{ display: 'flex', padding: 10, gap: 20 }}>
      <TextInput label="Título da Unidade" mode="outlined" outlineColor="transparent" />
      <List.AccordionGroup>
        {questions.map((question) => (
          <List.Accordion title={`Questão ${question.id}`} id={question.id} key={question.id}>
            <FormComponent />
          </List.Accordion>
        ))}
      </List.AccordionGroup>
      <Button onPress={addQuestion} mode="contained" style={styledForm.button}>
        Criar Nova Questão
      </Button>
    </View>
  );
}
