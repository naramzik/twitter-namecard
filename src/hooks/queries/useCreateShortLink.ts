import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface CardId {
  cardId: string;
}

export const useCreateShortLink = () => {
  return useMutation({
    mutationFn: (data: CardId) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/short-link`, data),
  });
};
