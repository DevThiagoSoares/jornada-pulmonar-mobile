import { View, Image } from 'react-native';
import { Avatar } from 'react-native-paper';

import { styledAvatar } from '~/screens/Teacher/Components/Avatar/styles';

interface AvatarProps {
  photo: string | null;
  sizePhoto: number;
  crown: string | any;
}
export function AvatarImg(props: AvatarProps) {
  return (
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
  );
}
