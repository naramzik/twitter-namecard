import { useMutation } from '@tanstack/react-query';
import { put } from '@/libs/axiosInterceptor';
import { CardType } from '@/types/cards';

interface SubmittedCard {
  cardId: string;
  allData: CardType;
}

export const useUpdateCard = () => {
  return useMutation({
    mutationFn: (data: SubmittedCard) => {
      return put<{ updatedCard: { id: number }[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards/${data.cardId}`,
        data.allData,
      );
    },
  });
};
