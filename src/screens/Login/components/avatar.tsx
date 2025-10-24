import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { styledAvatar } from './styles';

interface AvatarProps {
  setImg: (value: any) => void;
  userImg?: string | null;
}

const AvatarPicker = (props: AvatarProps) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    if (props.userImg) {
      setProfilePic(props.userImg);
    }
  }, [props.userImg]);

  const selectProfilePic = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          'Permissão negada',
          'É necessário permitir acesso à galeria para selecionar uma foto de perfil.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pic = result.assets[0];
        console.log('Imagem selecionada:', { uri: pic.uri, hasBase64: !!pic.base64 });
        
        setProfilePic(pic.uri);

        if (pic.base64) {
          const urlImg = `data:image/png;base64,${pic.base64}`;
          props.setImg(urlImg);
        
          Toast.show({
            type: 'success',
            text1: 'Foto selecionada!',
            text2: 'Sua foto de perfil foi selecionada com sucesso',
          });
        } else {
          console.error('Base64 não disponível');
          Alert.alert('Erro', 'Não foi possível processar a imagem');
        }
      } else {
        console.log('Seleção de imagem cancelada');
      }
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem. Tente novamente.');
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
