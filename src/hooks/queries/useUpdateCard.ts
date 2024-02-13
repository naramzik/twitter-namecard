import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface SubmittedCard {
  cardId: string;
  allData: {
    customFields: {
      key: string;
      contents: string;
    }[];
    socialMedia: {
      instagram: string;
      github: string;
      blog: string;
    };
    nickname: string;
    twitter: string;
    hashtags: string[];
    password: string;
  };
}

export const useUpdateCard = () => {
  return useMutation({
    mutationFn: (data: SubmittedCard) => {
      console.log('data.allData: ', data.allData);
      return axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards/${data.cardId}`, data.allData);
    },
  });
};
