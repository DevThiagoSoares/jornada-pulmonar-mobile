/**
 * Gera URL para download de arquivo de áudio
 * 
 * A URL base pode ser configurada via variável de ambiente:
 * EXPO_PUBLIC_AUDIO_BASE_URL
 * 
 * Opções:
 * - GitHub: https://raw.githubusercontent.com/SEU_USUARIO/REPO/main
 * - Backend: http://seu-backend.com/api/v1/audios
 * - S3: https://seu-bucket.s3.amazonaws.com/audios
 */
export const urlGithub = (audioFilename: string) => {
  // Tenta usar variável de ambiente primeiro
  const baseUrl = process.env.EXPO_PUBLIC_AUDIO_BASE_URL;
  
  if (baseUrl) {
    // Remove barra final se existir
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanBaseUrl}/${audioFilename}`;
  }
  
  // Fallback para o repositório antigo (para compatibilidade)
  // IMPORTANTE: Atualize este URL para seu novo repositório
  console.warn(
    'EXPO_PUBLIC_AUDIO_BASE_URL não configurado. Usando fallback (pode não funcionar).'
  );
  return `https://raw.githubusercontent.com/nandamsouza/audioFiles/main/${audioFilename}`;
};
