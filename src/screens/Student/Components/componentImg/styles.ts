/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: '#FFFF',
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    width: 360,
    padding: 7,
    paddingLeft: 20,
    borderColor: 'transparent',
    backgroundColor: '#CD4C3E',
  },
  image: {
    width: 360,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 15,
  },
  audioIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 10,
    zIndex: 2,
  },
  audioIconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  modalText: {
    color: '#ccc',
    fontWeight: '500',
    fontSize: 20,
    padding: 15,
  },
  modalButton: {
    backgroundColor: '#CD4C3E',
    margin: 10,
    width: 200,
  },
  audioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#000', // Cor dos pontos de paginação
  },
});
