import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://24.199.108.245:5001',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const getToken = AsyncStorage.getItem('access_token');
  if (getToken && config.headers) {
    config.headers.Authorization = `Bearer ${getToken}`;
  }

  return config;
});

export { api };
