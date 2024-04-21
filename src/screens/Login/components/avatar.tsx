import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { styledAvatar } from './styles';
import { FileDTO } from '../creaetAccount';

interface AvatarProps {
  setImg: (value: FileDTO) => void;
  userImg?: string;
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
        base64: false, // Não precisamos mais do base64
      });

      if (!result.canceled) {
        const pic = result.assets[0];
        const fileInfo = await FileSystem.getInfoAsync(pic.uri);
        setProfilePic(pic.uri);

        if (fileInfo.exists) {
          const buffer = await FileSystem.readAsStringAsync(fileInfo.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const blob = new Blob([fileInfo.uri], { type: '[content-type]' });
          const data: FileDTO = {
            buffer: Buffer.from(buffer, 'base64'),
            fieldname: pic.fileName ?? '',
            mimetype: pic.type ?? '',
            originalname: pic.uri,
            size: fileInfo.size,
            encoding: '7bit',
            blob,
          };
          props.setImg(data);
        }
      }
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error);
    }
  };

  return (
    <TouchableOpacity style={styledAvatar.avatarContainer} onPress={selectProfilePic}>
      {profilePic ? (
        <Image source={{ uri: props.userImg ?? profilePic }} style={styledAvatar.avatarImage} />
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
