import { MaterialCommunityIcons } from '@expo/vector-icons';
//import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
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
        const fileInfo = await FileSystem.getInfoAsync(pic.uri);

        if (fileInfo.exists) {
          /*  const base64 = await FileSystem.readAsStringAsync(pic.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const httpUri = `data:image/jpeg;base64,${base64}`;
          const buffer = Buffer.from(httpUri, 'base64');
          console.log('====>', buffer); */
          setProfilePic(pic.uri);
          props.setImg(pic.uri);
        }
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
