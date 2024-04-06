import { StyleSheet } from 'react-native';

export const styledResponse = StyleSheet.create({
  conatiner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
