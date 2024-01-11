import { Database } from 'fakebase';
import { Entity } from '@/types/Entity';
import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from '@/utils/errorHandler';
// 닉네임
// 트위터 아이디
// 해시태그
// SNS 아이디
// - 인스타 아이디
// - 깃허브 아이디
// - 블로그 아이디
// 자유항목
// 고유한 id
// 키 / 값
// contents 필드
interface CardType extends Entity {
  nickname: string;
  twitter: string;
  hashtags?: string[];
  socialMedia?: SocialMedia;
  customFields?: CustomFields[];
}

type SocialMedia = {
  instagram: string;
  github: string;
  blog: string;
};

type CustomFields = {
  id: string;
  key: string;
  contents: string;
};

const db = new Database('./data');
const Card = db.table<CardType>('cards');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);
  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const cards = await Card.findAll();
        res.status(200).json({ cards });
      });
      break;

    case 'POST':
      await errorHandler(req, res, async () => {
        const { nickname, twitter, hashtags, socialMedia, customFields } = req.body;

        if (!nickname || !twitter) {
          return res.status(400).json({ message: '닉네임과 트위터 아이디를 적어주세요.' });
        }

        const newCard = await Card.create({ nickname, twitter, hashtags, socialMedia, customFields });
        res.status(201).json({ newCard });
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
