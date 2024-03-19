import { IconButton, Text } from 'react-native-paper';
import { ImageBackground, View } from 'react-native';
import img from 'src/assets/image/style3.png';
import { styles } from '~/screens/Login/styles';

export const ImageStep: React.FC = () => {
  return (
    <ImageBackground source={img} style={styles.backgroundImage} resizeMode="cover">
      <View style={{ display: 'flex', flexDirection: 'column', padding: 20, gap: 10 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <IconButton
            icon="image"
            mode="contained"
            size={30}
            iconColor="#FFF"
            style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
            onPress={() => console.log('teste')}
          />
          <Text
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: '#CD4C3E',
              fontSize: 16,
              fontWeight: '800',
            }}>
            Adicionando Imagens
          </Text>
          <IconButton
            icon="delete"
            mode="contained"
            size={30}
            iconColor="#FFF"
            style={{ backgroundColor: '#CD4C3E', borderRadius: 10 }}
            onPress={() => console.log('teste')}
          />
        </View>
        <View
          style={{
            borderRadius: 24,
            backgroundColor: 'rgba(246, 174, 174, 0.7)',
            padding: 12,
            paddingTop: 20,
            paddingBottom: 20,
          }}>
          <Text
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: '#CD4C3E',
              fontSize: 12,
              fontWeight: '600'
            }}>
            Imagem Principal:
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};
