import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://api-pulmao.labtecs.com.br',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const getToken = await AsyncStorage.getItem('access_token');
  if (getToken && config.headers) {
    config.headers.Authorization = `Bearer ${getToken}`;
  }
  return config;
});

export { api };
