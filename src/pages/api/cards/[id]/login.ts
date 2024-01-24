import { Database } from 'fakebase';
import { Entity } from '@/types/Entity';
import errorHandler from '@/utils/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CardType extends Entity {
  password: string;
}

const db = new Database('./data');
const Card = db.table<CardType>('cards');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cardId = req.query.id as string;

  switch (req.method) {
    case 'POST':
      await errorHandler(req, res, async () => {
        const { password } = req.body;
        const card = await Card.findById(cardId);
        // TODO JWT query 를 주기
        if (password === card?.password) {
          return res.status(201).json('비밀번호가 일치합니다.');
        } else {
          return res.status(401).json('비밀번호가 일치하지 않습니다.');
        }
      });
      break;

    default:
  }
}
