/**
 * Utilitário para tratamento centralizado de erros
 */

export interface ErrorResponse {
  message: string;
  status?: number;
  code?: string;
}

/**
 * Extrai uma mensagem de erro amigável de um erro genérico
 */
export function getErrorMessage(error: any): string {
  // Erro de rede
  if (error?.message === 'Network Error') {
    return 'Erro de conexão. Verifique sua internet e tente novamente';
  }

  // Erro com resposta do servidor
  if (error?.response) {
    const status = error.response.status;
    const message = error.response.data?.message;

    switch (status) {
      case 400:
        return message || 'Dados inválidos. Verifique os campos e tente novamente';
      case 401:
        return 'Email ou senha incorretos';
      case 403:
        return 'Você não tem permissão para acessar este recurso';
      case 404:
        return message || 'Recurso não encontrado';
      case 409:
        return message || 'Este registro já existe';
      case 422:
        return message || 'Dados inválidos';
      case 500:
        return 'Erro no servidor. Tente novamente mais tarde';
      case 503:
        return 'Serviço temporariamente indisponível';
      default:
        return message || 'Ocorreu um erro. Tente novamente';
    }
  }

  // Erro com mensagem custom
  if (error?.message) {
    return error.message;
  }

  // Erro genérico
  return 'Ops! Algo deu errado. Tente novamente';
}

/**
 * Verifica se um erro é de conexão/rede
 */
export function isNetworkError(error: any): boolean {
  return (
    error?.message === 'Network Error' ||
    error?.code === 'ECONNABORTED' ||
    error?.code === 'ERR_NETWORK' ||
    !error?.response
  );
}

/**
 * Verifica se um erro é de autenticação
 */
export function isAuthError(error: any): boolean {
  return error?.response?.status === 401 || error?.response?.status === 403;
}

/**
 * Verifica se um erro é de validação
 */
export function isValidationError(error: any): boolean {
  return error?.response?.status === 400 || error?.response?.status === 422;
}

