/* eslint-disable no-inner-declarations */
import * as FileSystem from 'expo-file-system';

export async function base64ToBlob(base64String: string): Promise<Blob | null> {
  try {
    const response = await fetch(`data:image/jpeg;base64,${base64String}`);
    const blobData = await response.blob();
    return blobData;
  } catch (error) {
    console.error('Erro ao converter base64 para Blob:', error);
    return null;
  }
}
