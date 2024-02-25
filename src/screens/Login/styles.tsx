/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '80%',
  },
  separator: {
    height: 1,
    marginVertical: 7,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  inputError: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    borderColor: '#F13005',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  linkText: {
    color: 'black',
    textDecorationLine: 'underline',
    fontSize: 16,
    right: 100,
  },

  image: {
    width: 150,
    height: 150,
  },

  button: {
    display: 'flex',
    width: '30%',
    height: 44,
    left: 110,
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
  errorText: {
    color: '#CD4C3E',
    fontSize: 12,
    marginTop: 5,
  },
});
