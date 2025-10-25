import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MD2Colors, ProgressBar, RadioButton } from 'react-native-paper';
import { getUrlFile } from 'utils/downloadFile';

import { listAudios } from './list-file';
import { styledAudio } from './styles';

import { useAudioPlayer } from 'expo-audio';
import { Toastfy } from '~/Shared/notification/internal';

interface audioProps {
  getAudio: (value: string) => void;
}

export function ListAudio(props: audioProps) {
  const [audio, setAudio] = useState<any>();
  const [option, setOption] = useState('');
  const [isActiveSong, setIsActiveSong] = useState(false);
  const audioPlayer = useAudioPlayer();
  const [loadedAudioFiles, setLoadedAudioFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const [downloadedFiles, setDownloadedFiles] = useState<number>(0);

  const getAudioUri = async (audioFilename: any) => {
    try {
      // Salvando o áudio localmente
      const localUri = getUrlFile(audioFilename);
      return localUri ?? localUri;
    } catch (error) {
      console.error('Erro ao buscar o áudio no GitHub:', error);
      return 'error';
    }
  };

  const createAudioFiles = async () => {
    const files = [];

    for (let index = 0; index < listAudios.length; index++) {
      const filename = listAudios[index];
      const title = filename.replace(/\.[^/.]+$/, ''); // Remove a extensão do arquivo
      const uri = await getAudioUri(filename);
      setDownloadedFiles((prev) => prev + 1);
      files.push({
        id: index + 1,
        title,
        uri,
      });
    }

    return files;
  };

  useEffect(() => {
    const loadAudioFiles = async () => {
      const files = await createAudioFiles();
      setLoadedAudioFiles(files);
      setLoading(false);
    };
    loadAudioFiles();
  }, []);

  useEffect(() => {
    if (listAudios.length > 0) {
      setProgress(downloadedFiles / listAudios.length);
    }
  }, [downloadedFiles, listAudios.length]);

  const handleAudioIconPress = async (item: any) => {
    setIsActiveSong(!isActiveSong);

    const uri = item.uri;
    if (uri !== 'error') {
      setAudio(uri);
      if (uri) {
        try {
          audioPlayer.replace({ uri });
          audioPlayer.play();
        } catch (error) {
          console.error('Erro ao carregar/reproduzir áudio:', error);
          Toastfy('error', JSON.stringify(error));
        }
      }
    } else {
      console.error('Erro ao obter URI do áudio.');
      Toastfy('error', 'Erro ao obter URI do áudio.');
    }
  };
  const handleStopAudio = async () => {
    try {
      setIsActiveSong(!isActiveSong);
      setAudio(null);
      audioPlayer.pause();
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
          <Text style={{ color: '#ffff', width: 220, marginTop: 4 }}>{item.title}</Text>
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

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 13 }}>
          {/* <ActivityIndicator animating color={MD2Colors.red800} size="large" /> */}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Carregando: {Math.round(progress * 100)}%
          </Text>
          <ProgressBar
            progress={progress}
            color={MD2Colors.red800}
            style={{ width: 200, height: 10, borderRadius: 20 }}
          />
        </View>
      ) : (
        loadedAudioFiles.map((item, idx) => renderItem(item))
      )}
    </>
  );
}
