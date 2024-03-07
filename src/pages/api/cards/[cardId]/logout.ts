import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await errorHandler(req, res, async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          return res.status(401).json('로그아웃을 실패했습니다.');
        }

        return res.status(201).json('로그아웃에 성공했습니다.');
      });
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
  }
}
