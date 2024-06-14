import { api } from '../../api-config';

import { Toastfy } from '~/Shared/notification/internal';

export async function getModules() {
  return await api.get('/api/v1/modules');
}

export async function editModule(moduleId: string, title: string) {
  try {
    return await api.patch(`/api/v1/modules/:${moduleId}`, title);
  } catch (error: any) {
    console.log(error);
    error.message && Toastfy('error', error.message);
  }
}

export async function editOption(optionId: string, content: string) {
  try {
    return await api.patch(`/api/v1/modules/:${optionId}`, content);
  } catch (error: any) {
    console.log(error);
    error.message && Toastfy('error', error.message);
  }
}
