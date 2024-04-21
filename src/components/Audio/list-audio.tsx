import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { AudioFiles } from './list-file';
import { styledAudio } from './styles';

interface audioProps {
  getAudio: (value: string) => void;
}

export function ListAudio(props: audioProps) {
  const [audio, setAudio] = useState<any>();
  const [option, setOption] = useState('');
  const [isActiveSong, setIsActiveSong] = useState(false);
  const totalAudios = 20;
  const soundObject = useRef(new Audio.Sound()).current;

  const getAudioUri = (index: number) => {
    const audioFilename = Asset.fromModule(AudioFiles[`Caso_${index}`] ?? '');
    if (!audioFilename) {
      console.error(`Arquivo de áudio não encontrado para o índice ${index + 1}`);
      return ''; // Ou retorne um valor padrão caso não encontre o arquivo
    }

    const fileUri = audioFilename.uri;

    return fileUri;
  };

  const audioFiles = Array.from({ length: totalAudios }, (_, index) => ({
    id: index + 1,
    title: `Caso ${index + 1}`,
    uri: getAudioUri(index + 1),
  }));

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
    setIsActiveSong(!isActiveSong);
    const { uri } = item;
    setAudio(uri);
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
  const handleStopAudio = async () => {
    try {
      setIsActiveSong(!isActiveSong);
      setAudio(null);
      await soundObject.stopAsync();
    } catch (error) {
      console.error('Erro ao parar o áudio:', error);
    }
  };

  const SelectOption = (option: string, uri: string) => {
    setOption(option);
    props.getAudio(uri);
  };
  const renderItem = (item: any) => (
    <RadioButton.Group
      onValueChange={(newValue) => SelectOption(newValue, item.uri)}
      value={option}
      key={item.id}>
      <View key={item.id} style={styledAudio.container}>
        <View style={styledAudio.containerRadius}>
          <RadioButton value={item.title} color="#CD4C3E" key={item.id} />
          <Text style={{ color: '#ffff' }}>{item.title}</Text>
        </View>
        {audio === item.uri ? (
          <TouchableOpacity key={item.id} onPress={() => handleStopAudio()}>
            <Ionicons name="pause-circle" size={25} color="#CD4C3E" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity key={item.id} onPress={() => handleAudioIconPress(item)}>
            <Ionicons name="caret-forward-circle" size={25} color="#CD4C3E" />
          </TouchableOpacity>
        )}
      </View>
    </RadioButton.Group>
  );

  return <>{audioFiles.map((item, idx) => renderItem(item))}</>;
}
