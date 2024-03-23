import { StyleSheet } from 'react-native';

export const styledForm = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  styleInputUnit: {
    backgroundColor: 'rgba(229, 204, 200, 0.8)',
  },
  box: {
    backgroundColor: 'rgba(246, 174, 174, 0.5)',
    padding: 20,
    gap: 20,
    borderRadius: 20,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#CD4C3E',
    borderRadius: 16,
    padding: 10,
  },
  title: {
    color: '#CD4C3E',
    fontWeight: '800',
    fontSize: 15,
  },
});

export const styledAlternative = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  input: {
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  BoxRadio: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  button: {
    ...styledForm.button,
  },
});

export const styles = StyleSheet.create({
  surface: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#CD4C3E',
    borderRadius: 16,
    padding: 10,
  },
  buttonLink: {
    flex: 1,
    margin: 5,
    borderRadius: 16,
    padding: 10,
  },
});
