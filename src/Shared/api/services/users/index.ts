/* import { decode } from 'base-64';
import { ImagePickerAsset } from 'expo-image-picker'; */
import { Platform } from 'react-native';

import { api } from '../../api-config';

import { UserProps } from '~/Shared/Auth';

/* // Função para converter uma string base64 em Blob
function dataURItoBlob(dataURI: string): Blob {
  // Divide a string base64 para separar o cabeçalho 'data:image/jpeg;base64,' do conteúdo base64
  const byteString = atob(dataURI.split(',')[1]);

  // Cria um array de bytes para cada caractere da string base64
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  // Cria o Blob a partir do array de bytes
  const blob = new Blob([intArray], { type: 'image/jpeg' }); // Substitua 'image/jpeg' pelo tipo correto se necessário

  return blob;
} */

export async function createUsers(fileInfo: string, body: UserProps) {
  const formData = new FormData();
  formData.append('payload', JSON.stringify(body));

  if (!fileInfo) return;
  formData.append('file', fileInfo);

  return await api
    .post('/api/v1/users/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...Platform.select({
          android: { 'Access-Control-Allow-Origin': '*' },
        }),
      },
    })
    .catch((err) => console.log({ err }));
}

export async function validateEmail(email: string) {
  return await api.get(`/api/v1/users/:${email}`);
}

export async function ValidateLogin(params: any) {
  return await api.post('/api/v1/login', params);
}

export async function Ranking() {
  return await api.get('/api/v1/users');
}
