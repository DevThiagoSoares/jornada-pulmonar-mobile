/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-paper';

import { styles } from './styles';
import { useData } from '~/Shared/hooks/audio.context';
import { ListAudio } from '~/components/Audio/list-audio';
import { ScrollView } from 'react-native-gesture-handler';
import { Toastfy } from '~/Shared/notification/internal';

interface imgProps {
  titleImg: string;
  img: any;
  audioUrl: string;
}
interface AudioData {
  audioUrl: string;
}

export function AudioImg(props: imgProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [audioIconPosition, setAudioIconPosition] = useState<{ x: number; y: number } | null>(null);
  const soundObject = useRef(new Audio.Sound()).current;
  const [songActive, setSongActive] = useState(false);
  const [audios, setAudios] = useState<AudioData[]>([]);
  const { setData, data, setAudioCoordinates, audioCoordinates } = useData();
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
    const requestPermissions = async () => {
      const { granted } = await Audio.requestPermissionsAsync();
      if (granted) {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: true,
        });
      }
    };
    requestPermissions();
  }, []);

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
        await soundObject.unloadAsync();
        await soundObject.loadAsync({ uri });
        await soundObject.playAsync();
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
      await soundObject.stopAsync();
    } catch (error) {
      console.error('Erro ao parar o áudio:', error);
    }
  };
  const CloseModal = () => {
    const listAudios = audioFile ? [...audios, { audioUrl: audioFile }] : [];
    setModalVisible(!modalVisible);
    console.log({ listAudios });
    setData({ ...data, audioUrl: audioFile });
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
