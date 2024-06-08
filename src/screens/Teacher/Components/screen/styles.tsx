import { StyleSheet } from 'react-native';

export const styledEditQuestion = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 3,
    margin: 3,
    borderWidth: 2,
    borderRadius: 15,
    alignContent: 'center',
    borderColor: 'rgba(222, 139, 129, 0.7)',
    backgroundColor: 'rgba(222, 139, 129, 0.7)',
  },
  formContainer: {
    display: 'flex',
    gap: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 13,
    borderRadius: 6,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
