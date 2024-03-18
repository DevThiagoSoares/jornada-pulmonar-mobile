import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import { Button, Card, ProgressBar, Text } from 'react-native-paper';

import { styledCard } from './styles';

import { RootStackParamList } from '~/navigation/Routes';

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

interface cardProps {
  title: string;
  totalQuest: number;
  totalFinished: number;
  progress: number;
  img: any;
}

export function CardTemplate(props: cardProps) {
  const navigation = useNavigation<Props['navigation']>();

  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Card style={styledCard.cardContainer}>
        <Card.Content style={styledCard.content}>
          <View style={styledCard.avatar}>
            <Image source={props.img} style={{ width: 110, height: 175 }} />
          </View>
          <View style={{ display: 'flex', marginBottom: 30, gap: 15 }}>
            <Text variant="titleLarge" style={styledCard.title}>
              {props.title}
            </Text>
            <Text variant="bodyMedium" style={styledCard.text}>
              CONCLUÍDA - {props.totalFinished} / {props.totalQuest} PERGUNTAS
            </Text>
            <ProgressBar progress={props.progress} color="#FFB100" style={styledCard.progress} />
          </View>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon="arrow-right"
            contentStyle={{ flexDirection: 'row-reverse' }}
            style={{ backgroundColor: '#FFE815' }}
            labelStyle={styledCard.buttonLabel}
            onPress={() => navigation.navigate('Modal')}
            color="#9F8500">
            Começar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
