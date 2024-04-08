import { StyleSheet } from 'react-native';

export const styledModal = StyleSheet.create({
  containerText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  carouselContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    margin: 20,
  },
  iconImg: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 5,
    zIndex: 2,
  },
});

export const ActionIcon = StyleSheet.create({
  active: {
    ...styledModal.iconImg,
  },
  noActive: {
    ...styledModal.iconImg,
    backgroundColor: 'transparent',
  },
});
