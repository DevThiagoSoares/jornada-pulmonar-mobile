import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { ActionIcon } from '../modal/style';
import { defaultPosition } from './positions';
import { styles } from './styles';

import { useAudioPlayer } from 'expo-audio';
import { Toastfy } from '~/Shared/notification/internal';

interface ImgProps {
  titleImg: string;
  img: any;
  idImg: number;
  audioFile: any;
}

interface Coordinate {
  latX: number;
  lgnY: number;
}

export function CarouselComponent(props: ImgProps) {
  const [isActive, setActive] = useState(false);
  const [audio, setAudio] = useState<any>();
  const [getIndex, setIndex] = useState<number | null>(null);
  const audioPlayer = useAudioPlayer();

  useEffect(() => {
    handleStartAudio();
  }, [audio]);

  const handlePosition = () => {
    Toast.hide();
    setActive(true);
  };

  const handlefindPosition = (index: number) => {
    setIndex(index);
  };

  const handleClick = () => {
    Toastfy('error', 'Lugar errado! Por favor, tente novamente. 😢');
  };

  const handleStartAudio = async () => {
    if (audio) {
      try {
        // Carregue e inicie o novo áudio
        audioPlayer.replace({ uri: audio });
        audioPlayer.play();
      } catch (error) {
        console.error('Erro ao carregar/reproduzir áudio:', error);
      }
    }
  };
  const handleAudioIconPress = async (index: number, audioFile: any) => {
    setActive(true);
    handlePosition();
    handlefindPosition(index);
    setAudio(audioFile);
  };

  const handleStopAudio = async () => {
    try {
      setActive(false);
      audioPlayer.pause();
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
          onPress={() => handleAudioIconPress(idx, props.audioFile)}
          style={[
            getIndex === idx ? ActionIcon.active : ActionIcon.noActive,
            { left: coord.latX, top: coord.lgnY },
          ]}>
          {getIndex === idx && isActive ? (
            <Ionicons
              name="volume-high-outline"
              onPress={() => handleStopAudio()}
              size={15}
              color="#CD4C3E"
            />
          ) : (
            <Ionicons
              name="volume-mute-outline"
              size={15}
              onPress={() => handleAudioIconPress(idx, props.audioFile)}
              color={getIndex === idx ? '#CD4C3E' : '#00000000'}
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
