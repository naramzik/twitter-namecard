import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Password {
  password: string;
}

const checkPassword = async (password: Password) => {
  axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards/${cardId}/login`, password);
};
export const usePostPassword = () => {
  return useMutation({
    mutationFn: checkPassword,
  });
};
