import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { getUrlFile } from 'utils/downloadFile';

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
  const [audio, setAudio] = useState<any>();
  const [updateListAudios, setUpdateListAudios] = useState<any>([]);
  const { question } = useQuestion();
  const [getIndex, setIndex] = useState<number | null>(null);
  const soundObject = useRef(new Audio.Sound()).current;
  const arrayListAudios = question.audioUrl.length > 0 ? JSON.parse(question.audioUrl) : [];

  useEffect(() => {
    handleListAudios();
  }, []);

  useEffect(() => {
    handleStartAudio();
  }, [audio]);

  const handlePosition = () => {
    Toast.hide();
    setActive(true);
  };

  const handleListAudios = async () => {
    if (arrayListAudios.length > 0) {
      const updatedArrayListAudios = await Promise.all(
        arrayListAudios.map(async (item: any) => {
          const refFile = item.audioUrl.split('/').pop();
          const newAudioUrl = await getUrlFile(refFile);
          return { audioUrl: newAudioUrl };
        })
      );
      setUpdateListAudios(updatedArrayListAudios);
    }
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
        if (soundObject) {
          // Verifique se o áudio está carregado antes de tentar parar e descarregar
          const status = await soundObject.getStatusAsync();
          if (status.isLoaded) {
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
          }
        }

        // Carregue e inicie o novo áudio
        await soundObject.loadAsync({ uri: audio }, { shouldPlay: true });
        await soundObject.setPositionAsync(0);
        await soundObject.playAsync();
      } catch (error) {
        console.error('Erro ao carregar/reproduzir áudio:', error);
      }
    }
  };
  const handleAudioIconPress = async (index: number) => {
    setActive(true);
    handlePosition();
    handlefindPosition(index);
    if (updateListAudios.length > 3) {
      setAudio(updateListAudios[props.idImg - 1].audioUrl);
    } else {
      setAudio(updateListAudios[0].audioUrl);
    }
  };

  const handleStopAudio = async () => {
    try {
      setActive(false);
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
          onPress={() => handleAudioIconPress(idx)}
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
              onPress={() => handleAudioIconPress(idx)}
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
