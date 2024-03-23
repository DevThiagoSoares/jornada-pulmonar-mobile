import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import img from 'src/assets/image/level.png';

import { ComponentLevel } from '../unitCard/component-level';

export function CardDescription() {
  return (
    <Card>
      <Card.Title title="Título da Unidade" />
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{ display: 'flex', position: 'absolute', top: -30 }}>
          <ComponentLevel height={82} width={74} img={img} level="2" />
        </View>
        <Text variant="bodyMedium" style={{ display: 'flex', marginTop: 60 }}>
          Aiyan, indígena de 17 anos, está com tosse persistente, dificuldade para respirar, e dor
          no Peito Elemento Conteúdo copiado
        </Text>
      </Card.Content>
    </Card>
  );
}
