import axios, { AxiosError, AxiosRequestConfig, type AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
});

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

instance.interceptors.request.use(interceptorRequestFulfilled);

const interceptorResponseFulfilled = (response: AxiosResponse) => {
  if ('access_token' in response.data) {
    localStorage.setItem('accessToken', response.data.access_token);
  }

  return response.data;
};

const interceptorResponseRejected = async (error: AxiosError) => {
  if (error instanceof AxiosError) {
    return Promise.reject(error.response?.data ?? error);
  }

  return Promise.reject(error);
};

instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return instance.get(url, config);
};

export const post = <T = unknown, D = unknown>(url: string, data?: D): Promise<T> => {
  return instance.post(url, data);
};

export const remove = <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return instance.delete(url, config);
};

export const put = <T = unknown, D = unknown>(url: string, data?: D): Promise<T> => {
  return instance.put(url, data);
};
