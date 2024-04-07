import { View, Text } from 'react-native';
import { styledForm, styles } from '../styles';
import { IconButton } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigation/Routes';
import { useNavigation } from '@react-navigation/native';
import { ButtonDefault, InputNormal } from './ui';
import { Alternative } from './alternative-question';
type Props = StackScreenProps<RootStackParamList, 'ImageStepForm'>;
interface PropsQuestion {
  control: any;
  errors: any;
  submitForm: any;
  reset?: () => void;
}
export function ListQuestionsCard(props: PropsQuestion) {
  const navigation = useNavigation<Props['navigation']>();
  return (
    <View style={styledForm.box}>
      <View style={styledForm.icons}>
        <Text style={styledForm.title}>Questão</Text>
        <View style={styledForm.icons}>
          <IconButton
            icon="image"
            mode="contained"
            size={30}
            iconColor="#FFF"
            style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
            onPress={() => navigation.navigate('ImageStepForm')}
          />
          <IconButton
            icon="delete"
            mode="contained"
            size={30}
            iconColor="#FFF"
            style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
            onPress={props.reset}
          />
        </View>
      </View>

      <Controller
        control={props.control}
        render={({ field: { onBlur, onChange, value } }) => (
          <InputNormal
            value={value}
            label={props.errors?.Weight?.message || 'Peso da Questão'}
            onChange={onChange}
          />
        )}
        name="Weight"
        rules={{ required: 'Peso da questão é obrigatório' }}
        defaultValue=""
      />

      <Controller
        control={props.control}
        render={({ field: { onChange, value } }) => (
          <InputNormal
            value={value}
            label={props.errors?.question?.message || 'Digite a Pergunta'}
            onChange={onChange}
          />
        )}
        name="question"
        rules={{ required: 'Pergunta é obrigatória' }}
        defaultValue=""
      />
      <Controller
        control={props.control}
        render={({ field: { onChange, value } }) => (
          <Alternative onChange={onChange} errors={props.errors.alternatives?.message} />
        )}
        name="alternatives"
        rules={{ required: 'Adicione no mínimo duas alternativas' }}
      />
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <View style={styles.surface}>
          <ButtonDefault label="SALVAR" onClick={props.submitForm} />
        </View>
      </View>
    </View>
  );
}
