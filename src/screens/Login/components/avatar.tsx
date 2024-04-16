import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { styledAvatar } from './styles';

interface avatarProps {
  setImg: (value: any | null) => void;
}

const AvatarPicker = (props: avatarProps) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const selectProfilePic = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const url = result.assets.map((item) => item.uri);
      setProfilePic(url[0]);
      const blob = await fetch(url[0]).then((res) => res.blob());

      const formData = new FormData();
      formData.append('file', blob, `${url[0]}`);

      const fileInfo = {
        originalname: url[0],
        mimetype: blob.type,
        buffer: blob,
        size: blob.size,
      };
      props.setImg(fileInfo);
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
