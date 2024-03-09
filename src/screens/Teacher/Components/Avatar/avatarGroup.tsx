import { View, Image, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

import { styledAvatar } from './styles';

interface AvatarProps {
  name: string;
  photo: string | null;
  sizePhoto: number;
  points: number;
  crown: string | any;
}

export function AvatarGroup(props: AvatarProps) {
  return (
    <View style={styledAvatar.container}>
      <View style={styledAvatar.boxAvatar}>
        <View style={styledAvatar.crownIcon}>
          <Image source={props.crown} style={{ width: 54, height: 35 }} />
        </View>
        <Avatar.Image
          size={props.sizePhoto}
          source={{
            uri: `${props.photo}`,
          }}
        />
      </View>
      <View style={styledAvatar.boxContainerTitle}>
        <Text style={styledAvatar.title}>{props.name}</Text>
        <View style={styledAvatar.boxTitle}>
          <Text style={styledAvatar.title}>{props.points} pts</Text>
        </View>
      </View>
    </View>
  );
}
