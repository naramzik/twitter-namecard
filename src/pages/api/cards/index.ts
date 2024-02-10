import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const { data: cards, error } = await supabase.from('cards').select('*');
        if (error) throw error;
        res.status(200).json({ cards });
      });
      break;

    case 'POST':
      await errorHandler(req, res, async () => {
        const { nickname, twitter, hashtags, socialMedia, customFields, password } = req.body;

        if (!nickname || !twitter) {
          return res.status(400).json({ message: '닉네임 또는 트위터 아이디를 적어주세요.' });
        }
        // TODO JWT 토큰을 확인
        if (!password) {
          return res.status(400).json({ message: '비밀번호는 필수입니다.' });
        }
        const { data: newCard, error } = await supabase
          .from('cards')
          .insert({
            nickname,
            twitter,
            hashtags,
            socialMedia,
            customFields,
            password,
          })
          .select('*');
        if (error) throw error;

        res.status(201).json({ newCard });
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
