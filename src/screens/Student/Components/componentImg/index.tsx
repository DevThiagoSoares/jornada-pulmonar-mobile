import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker'; // Importe a biblioteca para upload de arquivo
import React, { useState, useRef } from 'react'; // Importe useRef
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-paper';

import { styles } from './styles';

interface imgProps {
  titleImg: string;
  img: any;
}

export function CarouselComponent(props: imgProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [audioFile, setAudioFile] = useState<any>(null); // Estado para armazenar o arquivo de áudio
  const soundObject = useRef(new Audio.Sound()).current; // Use useRef para manter o objeto de som entre renderizações

  const handlePress = (event: any) => {
    // Sua lógica existente para exibir o modal
    setModalVisible(true);
  };

  const handleAudioIconPress = async () => {
    if (audioFile) {
      const { uri } = audioFile;
      try {
        await soundObject.unloadAsync(); // Pare o som anterior, se houver
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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.titleImg}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Image source={props.img} style={styles.image} />
      </TouchableOpacity>

      {/* Se um arquivo de áudio foi carregado, exiba o ícone de áudio e o botão para parar */}
      {audioFile && (
        <>
          <TouchableOpacity style={styles.audioIcon} onPress={handleAudioIconPress}>
            <Text style={styles.audioIconText}>🔊</Text>
          </TouchableOpacity>
          <Button style={styles.modalButton} onPress={handleStopAudio}>
            Parar audio
          </Button>
        </>
      )}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Selecione um arquivo de áudio:</Text>
            <Button onPress={pickAudio} mode="contained" style={styles.modalButton}>
              Selecionar áudio
            </Button>
            {audioFile && <Text style={styles.modalText}>{audioFile.name}</Text>}
            <Button
              mode="contained"
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              Salvar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
