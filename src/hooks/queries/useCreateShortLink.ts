import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface CardId {
  cardId: string;
}

const getShortLink = async (cardId: CardId) => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/short-link`, cardId);
  return data.cards;
};

export const useCreateShortLink = () => {
  return useMutation({
    mutationFn: getShortLink,
  });
};
