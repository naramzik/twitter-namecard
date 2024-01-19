import { Database, Entity } from 'fakebase';
import errorHandler from '@/utils/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

interface LinkType extends Entity {
  cardId: string;
  shortLinks: string[];
}

const db = new Database('./data');
const Link = db.table<LinkType>('links');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const shortLink = req.query.shortLink as string;
        const foundLink = await Link.findOne((link) => link.shortLinks.includes(shortLink));

        if (foundLink) {
          res.redirect(202, `/${foundLink.cardId}`);
        } else {
          res.redirect(404, '/404');
        }
      });
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
