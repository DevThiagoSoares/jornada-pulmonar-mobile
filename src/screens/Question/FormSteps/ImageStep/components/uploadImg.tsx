import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import { styledImg } from '../style';

import { useData } from '~/Shared/hooks/audio.context';

const UploadImg = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { setData, data } = useData();

  useEffect(() => {
    if (data?.imgUrl) {
      setProfilePic(data.imgUrl);
    }
  }, [data]);

  const selectProfilePic = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const url = result.assets[0].uri;
      setProfilePic(url);
      setData({ ...data, imgUrl: url });
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
