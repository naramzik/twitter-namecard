import { Database } from 'fakebase';
import { v4 as uuidv4 } from 'uuid';
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
  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const cards = await Card.findAll();
        res.status(200).json({ cards });
      });
      break;

    case 'POST':
      await errorHandler(req, res, async () => {
        const { nickname, twitter, hashtags, socialMedia, customFields, password } = req.body;

        const customFieldsWithId = customFields.map((field: CustomFields) => ({
          ...field,
          id: uuidv4(),
        }));

        if (!nickname || !twitter) {
          return res.status(400).json({ message: '닉네임 또는 트위터 아이디를 적어주세요.' });
        }
        // TODO JWT 토큰을 확인
        if (!password) {
          return res.status(400).json({ message: '비밀번호는 필수입니다.' });
        }

        const newCard = await Card.create({
          nickname,
          twitter,
          hashtags,
          socialMedia,
          customFields: customFieldsWithId,
          password,
        });
        res.status(201).json({ newCard });
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
