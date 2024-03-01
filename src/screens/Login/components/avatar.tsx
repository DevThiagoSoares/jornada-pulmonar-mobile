import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import { styledAvatar } from './styles';

const AvatarPicker = () => {
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
    }
  };

  return (
    <TouchableOpacity style={styledAvatar.avatarContainer} onPress={selectProfilePic}>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={styledAvatar.avatarImage} />
      ) : (
        <View style={styledAvatar.avatarIcon}>
          {/*  <View style={styledAvatar.crownIcon}>
            <MaterialCommunityIcons name="crown" size={70} color="#FFD700" />
          </View> */}
          <MaterialCommunityIcons name="image-plus" size={40} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AvatarPicker;
