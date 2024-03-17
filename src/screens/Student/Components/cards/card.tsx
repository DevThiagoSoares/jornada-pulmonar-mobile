import { Image, View } from 'react-native';
import { Button, Card, ProgressBar, Text } from 'react-native-paper';

import { styledCard } from './styles';

interface cardProps {
  title: string;
  totalQuest: number;
  totalFinishe: number;
  progress: number;
  img: any;
}

export function CardTemplate(props: cardProps) {
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
              CONCLUÍDA - {props.totalFinishe} / {props.totalQuest} PERGUNTAS
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
            color="#9F8500">
            Começar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
