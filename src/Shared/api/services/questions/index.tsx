import { api } from '../../api-config';

import { Toastfy } from '~/Shared/notification/internal';

export async function CreateQuestion(file: any, body: any) {
  console.log({ file });
  const blob = await fetch(file).then((res) => res.blob());

  const formData = new FormData();
  formData.append('file', blob, `${body.name}.jpeg`);
  formData.append('payload', JSON.stringify(body));
  console.log({ formData });
  return await api.post('/api/v1/questions/on-module', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    maxBodyLength: Infinity,
  });
}

export async function ListQuestionApi() {
  try {
    return await api.get('/api/v1/questions');
  } catch (error) {
    console.log(error);
    Toastfy('error', 'Ops!... Algo deu errado');
  }
}
