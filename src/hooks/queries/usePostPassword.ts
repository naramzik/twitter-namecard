import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Password {
  cardId: string;
  password: string;
}

export const usePostPassword = () => {
  return useMutation({
    mutationFn: ({ cardId, password }: Password) => {
      return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards/${cardId}/login`, password);
    },
  });
};
