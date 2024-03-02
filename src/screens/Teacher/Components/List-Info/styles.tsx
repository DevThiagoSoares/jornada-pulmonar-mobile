import { StyleSheet } from 'react-native';

export const styledList = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(205, 76, 62, 0.8)',
  },
  title: {
    color: '#FFF',
    fontWeight: '700',
  },
});
