/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ApiClient {
  private httpClient: AxiosInstance;

  constructor(baseUrl?: string) {
    this.httpClient = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.get<T>(endpoint, config);
    return response.data;
  }

  async post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.post<T>(endpoint, data, config);
    return response.data;
  }

  async put<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.put<T>(endpoint, data, config);
    return response.data;
  }

  async patch<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.patch<T>(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.delete<T>(endpoint, config);
    return response.data;
  }
}
