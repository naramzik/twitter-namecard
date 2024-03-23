import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type ToastType = 'success' | 'error';

const toastMessage = (message: string, type: ToastType) => {
  toast[type](message, {
    duration: 2000,
  });
};

export const showToastErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const errorResponse = error.response?.data?.message ?? '서버 에러가 발생했습니다.';
    toast.error(errorResponse);
    return;
  }

  toast.error('에러가 발생했습니다.');
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

export const showToastPromiseMessage = (promise: Promise<void>, message: { loading: string; success: string }) => {
  toast.promise(promise, {
    loading: message.loading,
    success: message.success,
    error: (error) => {
      return error.response.data.message;
    },
  });
};
