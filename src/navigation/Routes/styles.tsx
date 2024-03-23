import { StyleSheet } from 'react-native';

export const styledHeader = StyleSheet.create({
  container: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '94%',
    justifyContent: 'space-between',
  },
  boxIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: '#FFFF',
    fontWeight: '800',
    fontSize: 15,
  },
});
