import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Password {
  password: string;
}

const checkPassword = async (password: Password) => {
  // TODO: 전역상태로 cardId 저장해서 사용하기
  const cardId = 'test';
  axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards/${cardId}/login`, password);
};

export const usePostPassword = () => {
  return useMutation({
    mutationFn: checkPassword,
  });
};
