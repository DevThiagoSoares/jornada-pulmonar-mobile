import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonLink: {
    flex: 1,
    margin: 5,
    borderRadius: 16,
    padding: 10,
  },
});

interface ButtonLinkProps {
  onClick: () => void;
  label: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ onClick, label }) => {
  return (
    <Button style={styles.buttonLink} textColor="#CD4C3E" onPress={onClick}>
      {label}
    </Button>
  );
};
