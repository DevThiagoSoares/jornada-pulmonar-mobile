import { StyleSheet } from 'react-native';

export const styledCheckBox = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    right: 65,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: 'black',
    borderRadius: 2,
  },
});
