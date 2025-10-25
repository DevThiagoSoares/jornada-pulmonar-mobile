import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import { styledForm, styles } from '../styles';
import { Alternative } from './alternative-question';
import { InputNormal } from './ui';

import { RootStackParamList } from '~/navigation/Routes';

type Props = StackScreenProps<RootStackParamList, 'ImageStepForm'>;
interface PropsQuestion {
  control: any;
  errors: any;
  submitForm: any;
  reset?: () => void;
  isLoadingButton?: boolean;
}
export function ListQuestionsCard(props: PropsQuestion) {
  const navigation = useNavigation<Props['navigation']>();
  return (
    <View style={styledForm.box}>
      <View style={styledForm.icons}>
        <View>
          <Text style={styledForm.title}>Questão</Text>
          <Text style={{ fontSize: 11, color: '#999', marginTop: 2 }}>
            Imagem opcional - clique no ícone para adicionar
          </Text>
        </View>
        <View style={styledForm.icons}>
          <IconButton
            icon="image"
            mode="contained"
            size={30}
            iconColor="#FFF"
            style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
            onPress={() => navigation.navigate('ImageStepForm')}
          />
        </View>
      </View>

      <Controller
        control={props.control}
        render={({ field: { onChange, value } }) => (
          <InputNormal
            errors={props.errors.question !== undefined}
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
          <Alternative
            inputError={props.errors.alternatives !== undefined}
            onChange={onChange}
            errors={props.errors.alternatives?.message}
          />
        )}
        name="alternatives"
        rules={{ required: 'Adicione no mínimo duas alternativas' }}
      />
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <View style={styles.surface}>
          <Button
            onPress={props.submitForm}
            style={styles.button}
            textColor="white"
            loading={props.isLoadingButton}>
            Salvar
          </Button>
        </View>
      </View>
    </View>
  );
}
