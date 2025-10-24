import axios from 'axios';
import { File, Paths } from 'expo-file-system';

import { urlGithub } from './downloadUrlfromGithub';

export async function getUrlFile(audioFilename: string) {
  const githubUrl = urlGithub(audioFilename);

  try {
    const response = await axios.get(githubUrl, { responseType: 'arraybuffer' });

    // Convertendo o ArrayBuffer para Base64
    const base64Data = btoa(
      new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    // Salvando o áudio localmente usando a nova API
    const file = new File(Paths.document, audioFilename);
    await file.write(base64Data);
    return file.uri;
  } catch (error) {
    console.log(error);
    return null;
  }
}
