import { Database, Entity } from 'fakebase';
import { customAlphabet } from 'nanoid';
import errorHandler from '@/utils/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

interface LinkType extends Entity {
  links: Record<string, string>;
}

const db = new Database('./data');
const Link = db.table<LinkType>('links');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await errorHandler(req, res, async () => {
        const { cardId } = req.body;
        const nanoid = customAlphabet(cardId, 5);

        const shortLink = nanoid();

        Link.create({
          links: { [shortLink]: cardId },
        });

        res.status(200).json({ shortLink });
      });
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
