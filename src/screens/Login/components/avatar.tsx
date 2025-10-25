import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { styledAvatar } from './styles';

interface AvatarProps {
  setImg: (value: any) => void;
  userImg?: string | null;
}

const AvatarPicker = (props: AvatarProps) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.userImg) {
      setProfilePic(props.userImg);
    }
  }, [props.userImg]);

  const selectProfilePic = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          'Permissão necessária',
          'Precisamos da sua permissão para acessar a galeria de fotos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pic = result.assets[0];
        
        if (!pic.base64) {
          Alert.alert('Erro', 'Não foi possível processar a imagem. Tente outra foto.');
          return;
        }
        
        setProfilePic(pic.uri);
        
        const urlImg = `data:image/png;base64,${pic.base64}`;
        props.setImg(urlImg);
      
        Toast.show({
          type: 'success',
          text1: '✓ Foto selecionada',
          text2: 'Avatar atualizado com sucesso',
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Alert.alert(
        'Erro ao selecionar foto',
        'Não foi possível selecionar a imagem. Tente novamente.',
        [{ text: 'OK' }]
      );
      
      if (__DEV__) {
        console.error('Erro ao selecionar a imagem:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity 
      style={styledAvatar.avatarContainer} 
      onPress={selectProfilePic}
      disabled={isLoading}
    >
      {isLoading ? (
        <View style={styledAvatar.avatarIcon}>
          <ActivityIndicator size="large" color="#CD4C3E" />
        </View>
      ) : profilePic ? (
        <Image source={{ uri: profilePic }} style={styledAvatar.avatarImage} />
      ) : (
        <View style={styledAvatar.avatarIcon}>
          <MaterialCommunityIcons name="camera-plus" size={40} color="#FFF" />
        </View>
      )}
      <Toast />
    </TouchableOpacity>
  );
};

export default AvatarPicker;
