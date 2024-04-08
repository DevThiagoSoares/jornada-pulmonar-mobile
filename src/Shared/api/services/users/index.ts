import { api } from '../../api-config';

import { UserProps } from '~/Shared/Auth';

export async function createUsers(data: UserProps) {
  return await api.post('/api/v1/users', data);
}

export async function validateEmail(email: string) {
  return await api.get(`/api/v1/users/${email}`);
}
