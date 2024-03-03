import { StyleSheet } from 'react-native';

export const styledForm = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  styleInputUnit: {
    backgroundColor: 'rgba(229, 204, 200, 0.8)',
  },
  box: {
    backgroundColor: 'rgba(229, 204, 200, 0.8)',
    padding: 20,
    gap: 10,
    marginTop: 20,
    borderRadius: 20,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
