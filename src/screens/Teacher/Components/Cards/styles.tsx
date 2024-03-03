import { StyleSheet } from 'react-native';

export const styledCard = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 5,
    flexDirection: 'column',
  },
  listOptions: {
    backgroundColor: 'rgba(229, 204, 200, 0.5)',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerTitle: {
    backgroundColor: 'rgba(205, 76, 62, 0.6)',
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
