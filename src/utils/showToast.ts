import toast from 'react-hot-toast';

type ToastType = 'success' | 'error';

export const showToast = (message: string, type: ToastType) => {
  toast[type](message, {
    duration: 2000,
    position: 'top-right',
  });
};
