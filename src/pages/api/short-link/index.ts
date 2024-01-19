import { Database, Entity } from 'fakebase';
import { customAlphabet } from 'nanoid';
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
    case 'POST':
      await errorHandler(req, res, async () => {
        const { cardId } = req.body;
        const nanoid = customAlphabet(cardId, 5);

        const shortLink = nanoid();
        const existingLink = await Link.findOne((link) => link.cardId === cardId);

        if (existingLink) {
          await Link.update({
            id: existingLink.id,
            cardId: existingLink.cardId,
            shortLinks: [...existingLink.shortLinks, shortLink],
          });
        } else {
          Link.create({
            cardId,
            shortLinks: [shortLink],
          });
        }

        res.status(200).json({ shortLink });
      });
      break;
    case 'GET':
      await errorHandler(req, res, async () => {
        const links = await Link.findAll();
        res.status(200).json({ links });
      });
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
