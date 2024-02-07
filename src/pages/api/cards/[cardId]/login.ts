import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cardId = req.query.id as string;

  switch (req.method) {
    case 'POST':
      await errorHandler(req, res, async () => {
        const { password } = req.body;
        const { data: card, error } = await supabase.from('cards').select('password').eq('id', cardId).single();

        if (error) {
          throw error;
        }
        // TODO JWT query 를 주기
        if (password === card?.password) {
          return res.status(201).json('비밀번호가 일치합니다.');
        } else {
          return res.status(401).json('비밀번호가 일치하지 않습니다.');
        }
      });
      break;

    default:
  }
}
