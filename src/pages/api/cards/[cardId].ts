import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cardId = req.query.cardId as string;

  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const { data: foundCard, error } = await supabase.from('cards').select('*').eq('id', cardId).single();
        if (error) throw error;
        res.status(200).json({ foundCard });
      });
      break;

    case 'DELETE':
      await errorHandler(req, res, async () => {
        const { data: cardToDelete, error } = await supabase.from('cards').delete().eq('id', cardId).select();
        if (error) throw error;
        if (!cardToDelete) {
          return res.status(404).json({ message: '삭제할 명함을 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: '명함이 삭제되었습니다.' });
      });
      break;

    case 'PUT':
      await errorHandler(req, res, async () => {
        const { data: updatedCard, error } = await supabase.from('cards').update(req.body).eq('id', cardId).select();

        if (error) throw error;
        if (!updatedCard) {
          return res.status(404).json({ message: '업데이트할 명함을 찾을 수 없습니다.' });
        }

        res.status(200).json(updatedCard);
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
      break;
  }
}
