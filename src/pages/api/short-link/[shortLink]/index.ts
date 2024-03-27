import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const shortLink = req.query.shortLink as string;
        const { data: links, error } = await supabase.from('links').select('*').eq('shortLink', shortLink);

        if (error) throw error;

        if (links && links.length > 0) {
          const redirectUrl: string = links[0].redirectUrl ?? '';
          res.redirect(`/card/${redirectUrl}`);
        } else {
          res.redirect(`/404`);
        }
      });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
