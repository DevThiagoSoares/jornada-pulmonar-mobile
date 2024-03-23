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
  baseAlternative: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
    padding: 10,
  },

  buttonTitle: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#CD4C3E',
    width: 150,
    padding: 6,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

export const styledAlternative = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    gap: 20,
  },
  alternativeCorrect: {
    ...styledCard.baseAlternative,
    backgroundColor: '#CD4C3E',
    fontWeight: '700',
  },
  alternative: {
    ...styledCard.baseAlternative,
    backgroundColor: '#CD6B5FC4',
    color: '#202F36',
  },
  title: {
    fontSize: 16,
  },
});
