/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

import { styledCard } from './Cards/styles';

export const styledOptions = StyleSheet.create({
  containerCard: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(205, 76, 62, 0.7)',
  },
  containerTitle: {
    ...styledCard.containerTitle,
    backgroundColor: 'rgba(222, 139, 129, 0.9)',
  },
});
