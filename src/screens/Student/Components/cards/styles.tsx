import { StyleSheet } from 'react-native';

export const styledCard = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#CD4C3E',
    padding: 10,
    margin: 10,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFF',
    fontWeight: '800',
  },
  text: {
    color: '#FFFF',
    fontSize: 15,
  },
  buttonLabel: {
    color: '#9F8500',
    fontWeight: '600',
    fontSize: 15,
  },
  progress: {
    borderRadius: 10,
    height: 14,
  },
  avatar: {
    position: 'absolute',
    borderRadius: 60,
    top: -170,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
