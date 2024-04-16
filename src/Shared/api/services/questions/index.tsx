import { api } from '../../api-config';

export async function CreateQuestion(file: any, body: any) {
  const formData = new FormData();
  formData.append('file', JSON.stringify(file));
  formData.append('payload', JSON.stringify(body));
  return await api.post('/api/v1/questions/on-module', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
