/* import { decode } from 'base-64';
import { ImagePickerAsset } from 'expo-image-picker'; */
import { Platform } from 'react-native';

import { api } from '../../api-config';

import { UserProps } from '~/Shared/Auth';
import { FileDTO } from '~/screens/Login/creaetAccount';

export async function createUsers(fileInfo: FileDTO, body: UserProps) {
  const formData = new FormData();
  if (!fileInfo.blob && fileInfo) return;
  formData.append('file', fileInfo.blob);
  formData.append('payload', JSON.stringify(body));
  return await api
    .post('/api/v1/users/', formData, {
      maxBodyLength: Infinity,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...Platform.select({
          android: { 'Access-Control-Allow-Origin': '*' },
        }),
      },
    })
    .catch((err) => console.log({ err }));
}

export async function validateEmail(email: string) {
  return await api.get(`/api/v1/users?email=${email}`);
}

export async function ValidateLogin(params: any) {
  return await api.post('/api/v1/login', params);
}

export async function Ranking() {
  return await api.get('/api/v1/users');
}
