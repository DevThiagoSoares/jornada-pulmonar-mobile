import axios from 'axios';
import * as FileSystem from 'expo-file-system';

import { urlGithub } from './downloadUrlfromGithub';

export async function getUrlFile(audioFilename: string) {
  const githubUrl = urlGithub(audioFilename);

  try {
    const response = await axios.get(githubUrl, { responseType: 'arraybuffer' });

    // Convertendo o ArrayBuffer para Base64
    const base64Data = btoa(
      new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    // Salvando o áudio localmente
    const localUri = `${FileSystem.documentDirectory}${audioFilename}`;
    await FileSystem.writeAsStringAsync(localUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return localUri;
  } catch (error) {
    console.log(error);
    return null;
  }
}
