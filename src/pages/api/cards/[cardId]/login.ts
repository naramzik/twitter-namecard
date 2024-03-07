import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cardId = req.query.cardId as string;

  switch (req.method) {
    case 'POST':
      await errorHandler(req, res, async () => {
        const { password } = req.body;
        const { data: foundEmail } = await supabase.from('cards').select('email').eq('id', cardId);
        const { data: user, error } = await supabase.auth.signInWithPassword({
          email: foundEmail && foundEmail[0].email,
          password,
        });

        if (error) {
          // throw error;
          return res.status(401).json('로그인이 실패했습니다.');
        }

        return res.status(201).json({ access_token: user.session.access_token });
      });
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
  }
}
