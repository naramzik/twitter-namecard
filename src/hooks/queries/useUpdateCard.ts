import { useMutation } from '@tanstack/react-query';
import { put } from '@/libs/axiosInterceptor';

interface SubmittedCard {
  cardId: string;
  allData: {
    customFields?: {
      key: string;
      contents: string;
    }[];
    socialMedia?: {
      instagram: string;
      github: string;
      blog: string;
    };
    nickname: string;
    twitter: string;
    hashtags?: string[];
    password: string;
    bio: string;
  };
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
