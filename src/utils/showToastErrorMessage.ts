import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type ToastType = 'success' | 'error';

const toastMessage = (message: string, type: ToastType) => {
  toast[type](message, {
    duration: 2000,
  });
};

export const showToastErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError;
  const errorResponse = JSON.stringify(axiosError.response?.data).replace(/"/gi, '');
  errorResponse && toastMessage(errorResponse, 'error');
};
