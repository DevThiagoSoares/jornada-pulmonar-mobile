import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { styledAvatar } from './styles';

interface AvatarProps {
  setImg: (value: any | null) => void;
}

const AvatarPicker = (props: AvatarProps) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const selectProfilePic = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri); // Define a imagem selecionada no estado
      const blob = await fetch(result.assets[0].uri).then((res) => res.blob()); // Obtém o blob da image
      const pic = result.assets[0];
      setProfilePic(pic.uri); // Define a imagem selecionada no estado
      const fileInfo = {
        fieldname: 'file',
        originalname: pic.uri,
        mimetype: pic.type,
        buffer: pic.base64,
        size: pic.fileSize,
        path: pic.uri,
      };

      props.setImg(pic); // Passa o objeto com o buffer para a função setImg
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
