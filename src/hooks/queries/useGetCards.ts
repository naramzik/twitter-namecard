import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Cards } from '@/types/cards';

const getCards = async () => {
  const res = await axios.get<Cards>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards`);
  return res.data.cards;
};

export const useGetCards = () => {
  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: () => getCards(),
  });
  return { cards };
};
