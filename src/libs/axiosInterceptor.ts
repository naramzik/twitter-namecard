import axios, { AxiosError, AxiosRequestConfig, type AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
});

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken !== null) {
    localStorage.setItem('accessToken', accessToken);
  }

  if (!config.headers) return config;
  if (!accessToken) return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

instance.interceptors.request.use(interceptorRequestFulfilled);

const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) return res;

  return Promise.reject(res);
};

const interceptorResponseRejected = async (error: AxiosError) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && originalRequest) {
    return Promise.reject(error.response?.data);
  }
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
