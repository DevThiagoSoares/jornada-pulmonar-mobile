import { Linking, Text } from 'react-native';

interface emailprops {
  email: string;
}
export const EmailLink = (props: emailprops) => {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${props.email}`);
  };

  return (
    <Text onPress={handleEmailPress} style={{ color: 'blue', textDecorationLine: 'underline' }}>
      {props.email}
    </Text>
  );
};
