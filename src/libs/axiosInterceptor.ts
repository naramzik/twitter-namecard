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

export const get = <T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
  return instance.get<T, R>(url, config);
};

export const post = <T = unknown, D = unknown, R = AxiosResponse<T>>(url: string, data?: D) => {
  return instance.post<T, R>(url, data);
};

export const remove = <T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
  return instance.delete<T, R>(url, config);
};

export const put = <T = unknown, D = unknown, R = AxiosResponse<T>>(url: string, data?: D) => {
  return instance.put<T, R>(url, data);
};
