import { Card, Text } from 'react-native-paper';

import { styledHometeacher } from '../../styles';

export function DescriptionCard() {
  return (
    <Card elevation={3}>
      <Card.Content style={styledHometeacher.boxContainer}>
        <Text variant="titleMedium" style={styledHometeacher.boxTitle}>
          Crie Novas Unidades
        </Text>
        <Text variant="bodyMedium" style={styledHometeacher.boxSubTitle}>
          Abaixo, você encontrará a opção "Suas Unidades" para iniciar o processo de criação das
          unidades.
        </Text>
        <Text variant="bodyMedium" style={styledHometeacher.boxSubTitle}>
          Acompanhe o desempenho individual de cada aluno acessando a opção "Ranking".
        </Text>
      </Card.Content>
    </Card>
  );
}
