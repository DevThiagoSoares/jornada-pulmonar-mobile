import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, FlatList } from 'react-native';

export function ListAudio() {
  const [modalVisible, setModalVisible] = useState(false);
  const totalAudios = 20; // Total de áudios que você deseja listar
  const audioFiles = Array.from({ length: totalAudios }, (_, index) => ({
    id: index + 1,
    title: `Audio ${index + 1}`,
    uri: `src/assets/SONS_PULMONARES/Caso_${index}.mp3`,
  }));
  console.log(audioFiles);
  const renderItem = (item: any) => (
    <TouchableOpacity onPress={() => handleAudioSelection(item)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleAudioSelection = (selectedAudio: any) => {
    // Aqui você pode adicionar a lógica para salvar ou manipular o áudio selecionado
    console.log('Áudio selecionado:', selectedAudio);
    setModalVisible(false); // Fechar o modal após selecionar um áudio
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Abrir Modal</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Lista de Áudios:</Text>
          {audioFiles.map((item, idx) => (
            <Text key={idx}>{item.title}</Text>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
