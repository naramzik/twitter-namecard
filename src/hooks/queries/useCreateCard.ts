import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface SubmittedCard {
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
  bio: string;
  // image_url: string;
}

export const useCreateCard = () => {
  return useMutation({
    mutationFn: (data: SubmittedCard) => {
      return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards`, data);
    },
  });
};
