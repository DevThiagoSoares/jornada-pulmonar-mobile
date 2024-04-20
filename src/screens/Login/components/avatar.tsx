import { MaterialCommunityIcons } from '@expo/vector-icons';
//import * as ImageManipulator from 'expo-image-manipulator';
import test from 'assets/audio/SONS_PULMONARES/Caso_1.mp3';
import { Asset } from 'expo-asset';
//import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { styledAvatar } from './styles';

//import { api } from '~/Shared/api/api-config';

interface AvatarProps {
  setImg: (value: string) => void;
}

const AvatarPicker = (props: AvatarProps) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const selectProfilePic = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        throw new Error('Permissão de acesso à biblioteca de mídia não concedida.');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: false,
      });

      if (!result.canceled) {
        const pic = result.assets[0];
        const file = Asset.fromURI(pic.uri);
        file.downloadAsync();
        const imgurl = Asset.fromModule(test);
        console.log('file', { file });
        console.log('\n uri', pic.uri);
        console.log('\n imgurl', imgurl);
        // Comprimir a imagem
        /* const compressedImage = await ImageManipulator.manipulateAsync(pic.uri, [], {
          compress: 0.5, // Ajuste a qualidade conforme necessário
          format: ImageManipulator.SaveFormat.JPEG, // Formato de saída
        });
        console.log({ compressedImage });
        const responseBlob = api
          .get(`data:image/jpeg;base64,${compressedImage.base64}`)
          .catch((er) => console.log({ er }));
        console.log({ responseBlob }); */
        // Aqui você pode fazer o que precisar com o base64 da imagem, como enviar para o servidor
        props.setImg(pic.uri);

        setProfilePic(pic.uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error);
    }
  };

  return (
    <TouchableOpacity style={styledAvatar.avatarContainer} onPress={selectProfilePic}>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={styledAvatar.avatarImage} />
      ) : (
        <View style={styledAvatar.avatarIcon}>
          <MaterialCommunityIcons name="image-plus" size={40} color="#FFF" />
        </View>
      )}
      <Toast />
    </TouchableOpacity>
  );
};

export default AvatarPicker;
