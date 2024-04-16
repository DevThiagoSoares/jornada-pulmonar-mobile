import { api } from '../../api-config';

export async function getModules() {
  return await api.get('/api/v1/modules');
}
