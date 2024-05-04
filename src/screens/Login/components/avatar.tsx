import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { styledAvatar } from './styles';

interface AvatarProps {
  setImg: (value: any) => void;
  userImg?: string | null;
}

const AvatarPicker = (props: AvatarProps) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  console.log(props?.userImg);

  useEffect(() => {
    if (props.userImg) {
      setProfilePic(props.userImg);
    }
  }, [props.userImg]);

  const selectProfilePic = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        throw new Error('Permissão de acesso à biblioteca de mídia não concedida.');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        const pic = result.assets[0];

        const fileInfo = await FileSystem.getInfoAsync(pic.uri);
        setProfilePic(pic.uri);

        if (fileInfo.exists) {
          const urlImg = `data:image/png;base64,${pic.base64}`;
          props.setImg(urlImg);
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
