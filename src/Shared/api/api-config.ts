import axios from 'axios';

export const API = axios.create({
    baseURL: process.env.URL_PROJECT_BACKEND,
    withCredentials: true,
});
