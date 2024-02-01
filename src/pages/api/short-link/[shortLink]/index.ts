import { Database, Entity } from 'fakebase';
import errorHandler from '@/utils/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

interface LinkType extends Entity {
  links: Record<string, string>;
}

const db = new Database('./data');
const Link = db.table<LinkType>('links');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const shortLink = req.query.shortLink as string;
        const allLinks = await Link.findAll();
        const foundLink = allLinks.find(
          (link) => link.links && Object.prototype.hasOwnProperty.call(link.links, shortLink),
        );

        if (foundLink) {
          const cardId = foundLink.links[shortLink];
          res.status(200).json({ redirectUrl: `/${cardId}` });
        } else {
          res.status(404).json({ redirectUrl: `/404` });
        }
      });
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
