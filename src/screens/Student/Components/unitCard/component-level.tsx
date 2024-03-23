import { ImageBackground, Text } from 'react-native';

interface levelProps {
  level: string;
  img: any;
  width: number;
  height: number;
}

export function ComponentLevel(props: levelProps) {
  return (
    <ImageBackground
      source={props.img}
      style={{
        width: props.width,
        height: props.height,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      resizeMode="cover">
      <Text style={{ color: '#ffff', fontSize: 25, fontWeight: 'bold' }}>{props.level}</Text>
    </ImageBackground>
  );
}
