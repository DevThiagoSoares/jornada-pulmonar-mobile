import { api } from '../../api-config';

import { UserProps } from '~/Shared/Auth';

export async function createUsers(fileInfo: Blob, body: UserProps) {
  try {
    const formData = new FormData();
    console.log({ fileInfo });
    //formData.append('file', fileInfo);
    formData.append('payload', JSON.stringify(body));

    return await api.post('/api/v1/users/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.log(error);
  }
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
