import { api } from '../../api-config';

import { UserProps } from '~/Shared/Auth';

export async function createUsers(file: any, body: UserProps) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('payload', JSON.stringify(body));
  try {
    return await api.post('/api/v1/users/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    return error;
  }
}

export async function validateEmail(email: string) {
  return await api.get(`/api/v1/users/${email}`);
}

export async function ValidateLogin(params: any) {
  return await api.post('/api/v1/login', params);
}
