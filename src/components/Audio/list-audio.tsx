import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { styledAudio } from './styles';

export function ListAudio() {
  const [modalVisible, setModalVisible] = useState(false);
  const [audio, setAudio] = useState<any>();
  const totalAudios = 20;
  const audioFiles = Array.from({ length: totalAudios }, (_, index) => ({
    id: index + 1,
    title: `Caso ${index + 1}`,
    uri: `asset/SONS_PULMONARES/Caso_${index + 1}.mp3`,
  }));
  const handleAudioIconPress = async (item: any) => {
    const { uri } = item;
    try {
      const soundObject = new Audio.Sound();
      await soundObject.unloadAsync();
      await soundObject.loadAsync({ uri });
      await soundObject.playAsync();
    } catch (error) {
      console.error('Erro ao carregar/reproduzir áudio:', error);
    }
    console.log(item);
  };

  const renderItem = (item: any) => (
    <RadioButton.Group onValueChange={(newValue) => setAudio(newValue)} value={audio} key={item.id}>
      <View key={item.id} style={styledAudio.container}>
        <View style={styledAudio.containerRadius}>
          <RadioButton value={item.title} color="#CD4C3E" />
          <Text>{item.title}</Text>
        </View>
        <TouchableOpacity onPress={() => handleAudioIconPress(item)}>
          <Ionicons name="caret-forward-circle" size={25} color="#CD4C3E" />
        </TouchableOpacity>
      </View>
    </RadioButton.Group>
  );

  const handleAudioSelection = (selectedAudio: any) => {
    console.log('Áudio selecionado:', selectedAudio);
    setModalVisible(false);
  };

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
