import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { AudioFiles } from './list-file';
import { styledAudio } from './styles';

import { Toastfy } from '~/Shared/notification/internal';

interface audioProps {
  getAudio: (value: string) => void;
}

export function ListAudio(props: audioProps) {
  const [audio, setAudio] = useState<any>();
  const [option, setOption] = useState('');
  const [isActiveSong, setIsActiveSong] = useState(false);
  const totalAudios = 21;
  const soundObject = useRef(new Audio.Sound()).current;

  const getAudioUri = (index: number) => {
    const audioKey = `Caso_${index}`;
    const audioFilename = AudioFiles[audioKey]; // Supondo que AudioFiles é um objeto contendo as referências aos arquivos de áudio
    if (!audioFilename) {
      console.error(`Arquivo de áudio não encontrado para o índice ${index + 1}`);
      return 'error'; // Ou retorne um valor padrão caso não encontre o arquivo
    }
    const audioAsset = Asset.fromModule(audioFilename);
    const fileUri = audioAsset.uri;

    return fileUri;
  };

  const audioFiles = Array.from({ length: totalAudios }, (_, index) => ({
    id: index + 1,
    title: `caso - ${index + 1}`,
    uri: getAudioUri(index + 1),
  }));

  useEffect(() => {
    const requestPermissions = async () => {
      const { granted } = await Audio.requestPermissionsAsync();
      console.log(audioFiles[20].uri);
      Toastfy('error', audioFiles[20].uri);
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

  const handleAudioIconPress = async (item: any) => {
    Toastfy('error', `audio ${getAudioUri(1)}`);
    setIsActiveSong(!isActiveSong);
    const { uri } = item;
    setAudio(uri);
    if (soundObject && uri) {
      try {
        await soundObject.unloadAsync();
        await soundObject.loadAsync({ uri }, { shouldPlay: true }); // Aqui você deve passar a URI do arquivo local
        await soundObject.setPositionAsync(0);
        await soundObject.playAsync();
      } catch (error) {
        console.error('Erro ao carregar/reproduzir áudio:', error);
        Toastfy('error', JSON.stringify(error));
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
