import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { defaultPosition } from './positions';
import { styles } from './styles';
import { styledModal } from '../modal/style';

interface ImgProps {
  titleImg: string;
  img: any;
  idImg: number;
}

interface Coordinate {
  latX: number;
  lgnY: number;
}

export function CarouselComponent(props: ImgProps) {
  const [isActive, setActive] = useState(true);

  const handlePosition = () => {
    setActive(!isActive);
  };

  return (
    <View style={styles.container}>
      {defaultPosition[`img${props.idImg}`].map((coord: Coordinate, idx: number) => (
        <TouchableOpacity
          key={idx}
          onPress={handlePosition}
          style={[styledModal.iconImg, { left: coord.latX, top: coord.lgnY }]}>
          {isActive ? (
            <Ionicons name="volume-high-outline" size={15} color="#CD4C3E" />
          ) : (
            <Ionicons name="volume-mute-outline" size={15} color="#CD4C3E" />
          )}
        </TouchableOpacity>
      ))}
      <Text style={styles.title}>{props.titleImg}</Text>
      <Image source={props.img} style={styles.image} />
    </View>
  );
}
