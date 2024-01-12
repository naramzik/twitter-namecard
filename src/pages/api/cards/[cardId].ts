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
  const cardId = req.query.cardId as string;
  const { nickname, twitter, hashtags, socialMedia, customFields } = req.body;

  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const card = await Card.findById(cardId);
        if (!card) {
          return res.status(404).json({ message: '명함을 찾을 수 없습니다.' });
        }
        res.status(200).json({ card });
      });
      break;

    case 'DELETE':
      await errorHandler(req, res, async () => {
        const cardToDelete = await Card.findById(cardId);
        if (!cardToDelete) {
          return res.status(404).json({ message: '삭제할 명함을 찾을 수 없습니다.' });
        }
        await Card.delete(cardId);
        res.status(200).json({ message: '명함이 삭제되었습니다.' });
      });
      break;

    case 'PUT':
      await errorHandler(req, res, async () => {
        const cardToUpdate = await Card.findById(cardId);
        if (!cardToUpdate) {
          return res.status(404).json({ message: '업데이트할 명함을 찾을 수 없습니다.' });
        }
        const updatedCard = await Card.update({ id: cardId, nickname, twitter, hashtags, socialMedia, customFields });
        res.status(200).json({ card: updatedCard });
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
      break;
  }
}
