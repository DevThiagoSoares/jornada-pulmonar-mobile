/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styledCard = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  listOptions: {
    backgroundColor: 'rgba(229, 204, 200, 0.5)',
  },
  ContainerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(222, 139, 129, 0.5)',
    borderRadius: 10,
    padding: 15,
  },
  containerTitle: {
    backgroundColor: 'rgba(205, 76, 62, 0.6)',
    borderRadius: 15,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export const styledOptions = StyleSheet.create({
  containerCard: {
    ...styledCard.ContainerCard,
    backgroundColor: 'rgba(205, 76, 62, 0.7)',
  },
  containerTitle: {
    ...styledCard.containerTitle,
    backgroundColor: 'rgba(222, 139, 129, 0.9)',
  },
});
