/**
 * Utilitários de validação para formulários
 */

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^\S+@\S+\.\S+$/i;
  return emailRegex.test(email);
}

/**
 * Valida senha forte
 * Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número
 */
export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Retorna mensagem de erro para senha fraca
 */
export function getPasswordError(password: string): string | null {
  if (!password) {
    return 'Senha é obrigatória';
  }
  if (password.length < 8) {
    return 'Senha deve ter no mínimo 8 caracteres';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Senha deve conter pelo menos uma letra maiúscula';
  }
  if (!/[a-z]/.test(password)) {
    return 'Senha deve conter pelo menos uma letra minúscula';
  }
  if (!/\d/.test(password)) {
    return 'Senha deve conter pelo menos um número';
  }
  return null;
}

/**
 * Valida se senhas são iguais
 */
export function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * Remove espaços em branco do início e fim
 */
export function trimString(value: string): string {
  return value?.trim() || '';
}

/**
 * Valida se campo não está vazio
 */
export function isRequired(value: any): boolean {
  if (typeof value === 'string') {
    return trimString(value).length > 0;
  }
  return value != null && value !== '';
}

