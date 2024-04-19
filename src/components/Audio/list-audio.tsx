import { Ionicons } from '@expo/vector-icons';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { styledAudio } from './styles';
const test =
  'https://github.com/DevThiagoSoares/jornada-pulmonar-mobile/blob/7e2663abea1ac7b9e00fcf218e2ca19939eaaa89/assets';
export function ListAudio() {
  const [modalVisible, setModalVisible] = useState(false);
  const [audio, setAudio] = useState<any>();
  const totalAudios = 20;

  const getAudioUri = (index: number) => {
    const audioFilename = `/audio/SONS_PULMONARES/Caso_${index + 1}.mp3`;
    const fileInfo = FileSystem.getInfoAsync(audioFilename);
    //console.log(fileInfo);

    const fileUri = FileSystem.documentDirectory + audioFilename;
    FileSystem.makeDirectoryAsync(fileUri, { intermediates: true });

    return fileUri;
  };

  const audioFiles = Array.from({ length: totalAudios }, (_, index) => ({
    id: index + 1,
    title: `Caso ${index + 1}`,
    uri: getAudioUri(index),
  }));
  // console.log({ audioFiles });

  useEffect(() => {
    Audio.requestPermissionsAsync().then(({ granted }) => {
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
    });
  }, []);

  const handleAudioIconPress = async (item: any) => {
    const { uri } = item;
    const soundObject = new Audio.Sound();
    if (soundObject && uri) {
      try {
        await soundObject.unloadAsync();
        await soundObject.loadAsync({ uri }); // Aqui você deve passar a URI do arquivo local
        await soundObject.playAsync();
      } catch (error) {
        console.error('Erro ao carregar/reproduzir áudio:', error);
      }
    }
  };

  const renderItem = (item: any) => (
    <RadioButton.Group onValueChange={(newValue) => setAudio(newValue)} value={audio} key={item.id}>
      <View key={item.id} style={styledAudio.container}>
        <View style={styledAudio.containerRadius}>
          <RadioButton value={item.title} color="#CD4C3E" key={item.id} />
          <Text>{item.title}</Text>
        </View>
        <TouchableOpacity onPress={() => handleAudioIconPress(item)} key={item.id}>
          <Ionicons name="caret-forward-circle" size={25} color="#CD4C3E" />
        </TouchableOpacity>
      </View>
    </RadioButton.Group>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Abrir Modal</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Lista de Áudios:</Text>
          {audioFiles.map((item, idx) => renderItem(item))}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
