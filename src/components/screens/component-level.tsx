import { ImageBackground, Text } from 'react-native';
import iconImage from 'src/assets/image/União.png';

export function ComponentLevel(level: string) {
  return (
    <ImageBackground
      source={iconImage}
      style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover">
      <Text style={{ color: '#ffff' }}>{level}</Text>
    </ImageBackground>
  );
}
