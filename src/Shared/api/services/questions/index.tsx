import { api } from '../../api-config';

export async function CreateQuestion(file: any, body: any) {
  console.log({ file });
  const blob = await fetch(file).then((res) => res.blob());

  const formData = new FormData();
  formData.append('file', blob, `${body.name}.jpg`);
  formData.append('payload', JSON.stringify(body));
  console.log({ formData });
  return await api.post('/api/v1/questions/on-module', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
