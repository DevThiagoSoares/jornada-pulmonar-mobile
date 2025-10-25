/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';
import { useData } from '~/Shared/hooks/audio.context';
import { Toastfy } from '~/Shared/notification/internal';
import { ListAudio } from '~/components/Audio/list-audio';
import { styles } from './styles';

interface imgProps {
  titleImg: string;
  img: any;
  audioUrl: string;
  handleAudioSelected: (audioFile: string) => void;
}

export function AudioImg(props: imgProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [audioIconPosition, setAudioIconPosition] = useState<{ x: number; y: number } | null>(null);
  const audioPlayer = useAudioPlayer();
  const [songActive, setSongActive] = useState(false);
  const { setAudioCoordinates, audioCoordinates } = useData();
  useEffect(() => {
    if (songActive) {
      handleAudioIconPress();
    } else if (audioFile !== null) {
      handleStopAudio();
    }
  }, [songActive]);

  useEffect(() => {
    if (audioCoordinates) {
      setAudioIconPosition(audioCoordinates);
    }
  }, [audioCoordinates]);

  useEffect(() => {
    if (props.audioUrl) {
      setAudioFile(props.audioUrl);
      setAudioIconPosition({ x: 100, y: 100 });
    }
  }, [props.audioUrl]);

  const handlePress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    setAudioIconPosition({ x: locationX - 30, y: locationY + 30 });
    setAudioCoordinates({ x: locationX, y: locationY });
    setModalVisible(true);
  };

  const handleIsActiveSong = () => {
    setSongActive(!songActive);
  };

  const handleAudioIconPress = async () => {
    if (audioFile) {
      const uri = audioFile;
      try {
        audioPlayer.replace({ uri });
        audioPlayer.play();
      } catch (error) {
        console.error('Erro ao carregar/reproduzir áudio:', error);
        Toastfy('error', JSON.stringify(error));
      }
    }
  };

  const handleGetAudio = (uri: string) => {
    setAudioFile(uri);
  };

  const handleStopAudio = async () => {
    try {
      audioPlayer.pause();
    } catch (error) {
      console.error('Erro ao parar o áudio:', error);
    }
  };
  const CloseModal = () => {
    setModalVisible(!modalVisible);
    props.handleAudioSelected(audioFile);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.titleImg}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Image source={props.img} style={styles.image} />
      </TouchableOpacity>

      {audioIconPosition && (
        <TouchableOpacity
          style={[styles.audioIcon, { left: audioIconPosition.x, top: audioIconPosition.y }]}
          onPress={handleIsActiveSong}>
          {songActive ? (
            <Ionicons name="pause-circle" size={25} color="#CD4C3E" />
          ) : (
            <Ionicons name="caret-forward-circle" size={25} color="#CD4C3E" />
          )}
        </TouchableOpacity>
      )}

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Selecione um arquivo de áudio:</Text>
            <ScrollView style={{ height: 200, width: '100%' }}>
              <ListAudio getAudio={handleGetAudio} />
            </ScrollView>
            <Button style={styles.modalButton} mode="contained" onPress={() => CloseModal()}>
              Salvar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
