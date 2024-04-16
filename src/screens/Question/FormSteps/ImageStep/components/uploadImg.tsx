import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import { styledImg } from '../style';

import { useData } from '~/Shared/hooks/audio.context';

const UploadImg = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { setData, data } = useData();

  const selectProfilePic = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const url = result.assets.map((item) => item.uri);
      setProfilePic(url[0]);
      setData({ ...data, imgUrl: url[0] });
    }
  };

  return (
    <TouchableOpacity style={styledImg.container} onPress={selectProfilePic}>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={styledImg.Image} />
      ) : (
        <View style={styledImg.Icon}>
          <MaterialCommunityIcons name="image-plus" size={30} color="#CD4C3E" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UploadImg;
