import { customAlphabet } from 'nanoid';
import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await errorHandler(req, res, async () => {
        const { cardId } = req.body;
        const nanoid = customAlphabet(cardId, 5);

        const shortLink = nanoid();

        const { data: link, error } = await supabase
          .from('links')
          .insert({ shortLink, redirectUrl: cardId })
          .select('shortLink');
        if (error) throw error;
        res.status(200).json(link);
      });
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
