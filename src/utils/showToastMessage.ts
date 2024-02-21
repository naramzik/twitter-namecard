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

export const showToastSuccessMessage = (message: string) => {
  toastMessage(message, 'success');
};

export const showToastLoadingMessage = (message: string) => {
  toast(message, {
    icon: '⏳',
    duration: 2000,
  });
};

export const showToastPromiseMessage = (promise, message) => {
  toast.promise(promise, {
    loading: message.loading,
    success: message.success,
    error: (error) => {
      console.log('error', error);
      return error.response.data.message;
    },
  });
};
