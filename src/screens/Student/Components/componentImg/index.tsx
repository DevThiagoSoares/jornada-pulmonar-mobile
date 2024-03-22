import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';

interface imgProps {
  titleImg: string;
  img: any;
}

export function CarouselComponent(props: imgProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.titleImg}</Text>
      <Image source={props.img} style={styles.image} />
    </View>
  );
}
