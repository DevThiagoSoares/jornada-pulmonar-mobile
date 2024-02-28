import { View, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { styledHometeacher } from './styles';
import { styles } from '../Login/styles';

const PageTeacher = () => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('src/assets/image/image-6845.png')}>
      <View style={styledHometeacher.container}>
        <Text style={styledHometeacher.title}>Bem-Vindo !</Text>
        <View style={styledHometeacher.card}>
          <Card elevation={3}>
            <Card.Content style={styledHometeacher.boxContainer}>
              <Text variant="titleMedium" style={styledHometeacher.boxTitle}>
                Crie de Novas Unidades
              </Text>
              <Text variant="bodyMedium" style={styledHometeacher.boxSubTitle}>
                Abaixo, você encontrará a opção "Suas Unidades" para iniciar o processo de criação
                das unidades.
              </Text>
              <Text variant="bodyMedium" style={styledHometeacher.boxSubTitle}>
                Acompanhe o desempenho individual de cada aluno acessando a opção "Ranking".
              </Text>
            </Card.Content>
          </Card>
        </View>
        <View style={styledHometeacher.Boxseparator}>
          <View style={styledHometeacher.separator} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default PageTeacher;
