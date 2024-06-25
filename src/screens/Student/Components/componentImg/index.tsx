import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { defaultPosition } from './positions';
import { styles } from './styles';
import { ActionIcon } from '../modal/style';

import { useQuestion } from '~/Shared/hooks/question.context';
import { Toastfy } from '~/Shared/notification/internal';

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
  const [isActive, setActive] = useState(false);
  const [activeIcon, setActiveIcon] = useState(false);
  const [audio, setAudio] = useState<any>();
  const { question } = useQuestion();
  const [getIndex, setIndex] = useState<number | null>(null);
  const soundObject = useRef(new Audio.Sound()).current;
  const arrayListAudios = question.audioUrl.lenght > 0 ? JSON.parse(question.audioUrl) : [];
  useEffect(() => {
    handleStartAudio();
  }, [audio]);

  const handlePosition = () => {
    Toast.hide();
    setActiveIcon(true);
  };

  const handlefindPosition = (index: number) => {
    setIndex(index);
  };

  const handleClick = () => {
    Toastfy('error', 'Lugar errado! Por favor, tente novamente. 😢');
  };

  const handleStartAudio = async () => {
    if (audio) {
      if (soundObject) {
        try {
          await soundObject.unloadAsync();
          await soundObject.loadAsync({ uri: audio });
          await soundObject.playAsync();
        } catch (error) {
          console.error('Erro ao carregar/reproduzir áudio:', error);
        }
      }
    }
  };
  const handleAudioIconPress = async () => {
    setActive(!isActive);
    handlePosition();
    if (arrayListAudios.length > 3) {
      setAudio(arrayListAudios[props.idImg - 1].audioUrl);
    } else {
      setAudio(arrayListAudios[0].audioUrl);
    }
  };
  const handleStopAudio = async () => {
    try {
      setActive(!isActive);
      handlePosition();
      await soundObject.stopAsync();
      setAudio(null);
    } catch (error) {
      console.error('Erro ao parar o áudio:', error);
    }
  };

  return (
    <View style={styles.container}>
      {defaultPosition[`img${props.idImg}`].map((coord: Coordinate, idx: number) => (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            handlePosition(), handlefindPosition(idx);
          }}
          style={[
            activeIcon ? ActionIcon.active : ActionIcon.noActive,
            { left: coord.latX, top: coord.lgnY },
          ]}>
          {isActive ? (
            <Ionicons
              name="volume-high-outline"
              onPress={() => handleStopAudio()}
              size={15}
              color={activeIcon ? '#CD4C3E' : '#00000000'}
            />
          ) : (
            <Ionicons
              name="volume-mute-outline"
              size={15}
              onPress={() => handleAudioIconPress()}
              color={activeIcon ? '#CD4C3E' : '#00000000'}
            />
          )}
        </TouchableOpacity>
      ))}
      <Text style={styles.title}>{props.titleImg}</Text>
      <TouchableOpacity onPress={handleClick}>
        <Image source={props.img} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}
