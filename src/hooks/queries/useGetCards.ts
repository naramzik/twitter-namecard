import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Cards } from '@/types/cards';

const getCards = async (query: string) => {
  const res = await axios.get<Cards>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards`, {
    params: { query },
  });
  return res.data.cards;
};

export const useGetCards = (query: string) => {
  const { data: cards } = useQuery({
    queryKey: ['cards', query],
    queryFn: () => getCards(query),
  });
  return { cards };
};
