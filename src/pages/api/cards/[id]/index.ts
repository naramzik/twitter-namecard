import { Database } from 'fakebase';
import { Entity } from '@/types/Entity';
import errorHandler from '@/utils/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CardType extends Entity {
  nickname: string;
  twitter: string;
  hashtags?: string[];
  socialMedia?: SocialMedia;
  customFields?: CustomFields[];
  password: string;
}

interface SocialMedia {
  instagram: string;
  github: string;
  blog: string;
}

interface CustomFields {
  id: string;
  key: string;
  contents: string;
}

const db = new Database('./data');
const Card = db.table<CardType>('cards');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const twitterId = req.query.id as string;

  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const foundCard = await Card.findOne((card) => card.twitter === twitterId);
        res.status(200).json({ foundCard });
      });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
