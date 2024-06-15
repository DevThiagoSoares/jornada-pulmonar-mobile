import { api } from '../../api-config';

import { Toastfy } from '~/Shared/notification/internal';

export async function CreateQuestion(body: any) {
  return await api.post('/api/v1/questions/on-module', body);
}

export async function ListQuestionApi(userId: string) {
  try {
    return await api.get(`/api/v1/questions?userId=${userId}`);
  } catch (error) {
    console.log(error);
    Toastfy('error', 'Ops!... Algo deu errado');
  }
}
export async function findByQuestionApi(moduleId: string) {
  try {
    return await api.get(`/api/v1/questions?userId=${moduleId}`);
  } catch (error) {
    console.log(error);
    Toastfy('error', 'Ops!... Algo deu errado');
  }
}

export async function findQuestionById(id: string) {
  try {
    return await api.get(`/api/v1/questions?id=${id}`);
  } catch (error) {
    Toastfy('error', 'Ops!... Algo deu errado');
    console.log(error);
  }
}

export async function editQuestion(questionId: string, data: any) {
  return await api.patch(`api/v1/questions/:${questionId}`, data);
}

export async function deleteQuestion(questionId: string) {
  return await api.delete(`api/v1/questions/:${questionId}`);
}
