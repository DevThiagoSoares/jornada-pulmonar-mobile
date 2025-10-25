/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

import { styledCard } from './Cards/styles';

export const styledOptions = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  containerCard: {
    display: 'flex',
    padding: 16,
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
    minHeight: 120,
    backgroundColor: 'rgba(205, 76, 62, 0.7)',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  containerTitle: {
    ...styledCard.containerTitle,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 140,
    maxWidth: '100%',
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  questionsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  questionsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
