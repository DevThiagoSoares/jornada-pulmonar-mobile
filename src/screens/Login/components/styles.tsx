import { StyleSheet } from 'react-native';

import { styles } from '../styles';

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

export const styledUser = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  input: {
    width: '100%',
  },
  error: {
    ...styles.errorText,
  },
  profilePicButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  button: {
    display: 'flex',
    width: '50%',
    height: 44,
    marginVertical: 10,
    backgroundColor: '#CD4C3E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export const styledAvatar = StyleSheet.create({
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 60,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  avatarIcon: {
    width: 115,
    height: 115,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CD4C3E',
  },
  avatarText: {
    marginTop: 8,
    color: '#888',
  },
});
export const styledRadio = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
  },
});
