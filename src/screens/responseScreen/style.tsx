import { StyleSheet } from 'react-native';

export const styledResponse = StyleSheet.create({
  backgroundScreen: {
    flex: 1,
    resizeMode: 'cover', // ou 'stretch'
    backgroundColor: 'rgba(205, 107, 95, 0.5)',
  },
  conatiner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 820,
    gap: 25,
  },
  containerPts: {
    display: 'flex',
    flexDirection: 'row',
  },
  textPts: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 18,
    padding: 12,
    backgroundColor: 'rgba(205, 107, 95, 0.5)',
    borderRadius: 20,
  },
  img: {
    width: 130,
    height: 130,
  },
  points: {
    display: 'flex',
    margin: 20,
    backgroundColor: '#F6A000',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    elevation: 5,
  },
  pointText: {
    color: '#FFFF',
    fontWeight: '800',
    fontSize: 19,
  },
  title: {
    color: '#FFFF',
    fontWeight: '800',
    fontSize: 30,
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderColor: '#FFF',
    borderWidth: 1,
    borderStyle: 'dashed',
    position: 'absolute',
  },
  timeText: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 30,
    color: '#CD4C3E',
    fontWeight: '700',
    width: 190,
    textAlign: 'center',
  },
});
