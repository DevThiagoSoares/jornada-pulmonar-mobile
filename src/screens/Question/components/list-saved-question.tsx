import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

import { styledForm, styledSavedQuestion } from '../styles';

interface savedQuestionProps {
  data?: any;
  navigation: () => void;
  reset: () => void;
  questioNumber: number;
}

export function ListSavedQuestion(props: savedQuestionProps) {
  return (
    <TouchableOpacity style={styledSavedQuestion.container}>
      <Text style={styledForm.title}>{`Questão ${props.questioNumber}`}</Text>
      <View style={styledForm.icons}>
        <IconButton
          icon="image"
          disabled
          mode="contained"
          size={15}
          iconColor="#FFF"
          style={{ backgroundColor: '#F8E7E3', borderRadius: 15 }}
          onPress={props.navigation}
        />
        <IconButton
          icon="delete"
          mode="contained"
          disabled
          size={15}
          iconColor="#FFF"
          style={{ backgroundColor: '#F8E7E3', borderRadius: 10 }}
          onPress={props.reset}
        />
      </View>
    </TouchableOpacity>
  );
}
