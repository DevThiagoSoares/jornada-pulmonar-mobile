import { ReactNode } from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';

interface imageProps {
  source: ImageSourcePropType | undefined;
  style: any;
  children: ReactNode;
  resizeMode: any;
}

export function BackgroundScreen(props: imageProps) {
  return (
    <ImageBackground source={props.source} style={props.style} resizeMode={props.resizeMode}>
      {props.children}
    </ImageBackground>
  );
}
