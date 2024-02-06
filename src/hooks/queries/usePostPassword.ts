import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Password {
  password: string;
}

export const usePostPassword = () => {
  const cardId = 'test';
  return useMutation({
    mutationFn: (data: Password) => {
      return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards/${cardId}/login`, data);
    },
  });
};
