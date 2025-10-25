import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Configuração da API
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://api-pulmao.labtecs.com.br',
  timeout: 30000, // 30 segundos
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição - Adiciona token de autenticação
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('access_token');
    
    if (token && config.headers) {
      // Remove aspas extras se existirem
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error('[API] Erro na requisição:', error);
    }
    return Promise.reject(error);
  }
);

// Interceptor de resposta - Tratamento de erros
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`[API] Resposta recebida de ${response.config.url}:`, response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (__DEV__) {
      console.error('[API] Erro na resposta:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
      });
    }

    // Se for erro 401, limpar token (sessão expirada)
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('access_token');
      // Aqui você pode adicionar lógica para redirecionar para login
    }

    return Promise.reject(error);
  }
);

export { api };
