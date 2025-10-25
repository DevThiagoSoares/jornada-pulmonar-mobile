import { api } from '../../api-config';

/**
 * Busca todas as respostas de um usuário específico
 * Retorna array de UserResponses com:
 * - questionId: ID da questão respondida
 * - isCorrect: Se a resposta foi correta
 * - choiceId: ID da alternativa escolhida
 */
export async function getUserResponses(userId: string) {
  try {
    return await api.get(`/api/v1/user-responses?userId=${userId}`);
  } catch (error) {
    if (__DEV__) {
      console.error('Erro ao buscar respostas do usuário:', error);
    }
    return { data: [] };
  }
}

