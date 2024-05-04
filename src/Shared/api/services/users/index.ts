import { api } from '../../api-config';

import { UserProps } from '~/Shared/Auth';

export async function createUsers(fileInfo: any, body: UserProps) {
  const data = {
    ...body,
    imageBase64: fileInfo,
  };
  console.log(data);
  return await api.post('/api/v1/users/', data).catch((err) => console.log({ err }));
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
