/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-paper';

import { styles } from './styles';
import { useData } from '~/Shared/hooks/audio.context';

interface imgProps {
  titleImg: string;
  img: any;
}

export function AudioImg(props: imgProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [audioIconPosition, setAudioIconPosition] = useState<{ x: number; y: number } | null>(null);
  const soundObject = useRef(new Audio.Sound()).current;
  const [songActive, setSongActive] = useState(false);
  const { setData, data } = useData();
  useEffect(() => {
    if (songActive) {
      handleAudioIconPress();
    } else if (audioFile !== null) {
      handleStopAudio();
    }
  }, [songActive]);

  const handlePress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    setAudioIconPosition({ x: locationX - 30, y: locationY + 30 });
    setModalVisible(true);
  };

  const handleIsActiveSong = () => {
    setSongActive(!songActive);
  };

  const handleAudioIconPress = async () => {
    if (audioFile) {
      const { uri } = audioFile;
      try {
        await soundObject.unloadAsync();
        await soundObject.loadAsync({ uri });
        await soundObject.playAsync();
      } catch (error) {
        console.error('Erro ao carregar/reproduzir áudio:', error);
      }
    }
  };

  const handleStopAudio = async () => {
    try {
      await soundObject.stopAsync();
    } catch (error) {
      console.error('Erro ao parar o áudio:', error);
    }
  };

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });

    if (!result.canceled) {
      setAudioFile(result.assets[0]);
      setData({ ...data, audioUrl: result.assets[0].uri });
    }
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
            <Button style={styles.modalButton} mode="contained" onPress={pickAudio}>
              Selecionar áudio
            </Button>
            {audioFile && <Text style={styles.modalText}>{audioFile.name}</Text>}
            <Button
              style={styles.modalButton}
              mode="contained"
              onPress={() => setModalVisible(false)}>
              Salvar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
