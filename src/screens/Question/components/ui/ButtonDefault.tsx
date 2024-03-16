import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#CD4C3E',
    borderRadius: 16,
    padding: 10,
  },
});

interface ButtonDefaultProps {
  onClick: () => void;
  label: string;
}

export const ButtonDefault: React.FC<ButtonDefaultProps> = ({ onClick, label }) => {
  return (
    <Button style={styles.button} textColor="white" onPress={onClick}>
      {label}
    </Button>
  );
};
