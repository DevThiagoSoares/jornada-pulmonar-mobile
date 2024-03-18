/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // ou 'stretch'
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  ViewInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 14,
    width: '80%',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  input: {
    height: 40,
    marginVertical: 5,
    padding: 10,
    width: '95%',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  inputError: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: '80%',
    marginVertical: 5,
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
  },

  image: {
    width: 150,
    height: 150,
  },

  button: {
    width: 100,
    height: 40,
    marginVertical: 10,
    backgroundColor: '#CD4C3E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    left: 110,
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
  containerOptions: {
    display: 'flex',
    width: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
});
