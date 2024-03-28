import { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from '@/utils/errorHandler';
import prisma from '@/utils/prisma';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(req, res, async function handler() {
    switch (req.method) {
      case 'GET': {
        const query = req.query.query as string | undefined;
        if (!query) {
          return res.status(400).json({ message: '검색어를 입력해주세요.' });
        }

        const cards = await prisma.cards.findMany({
          where: {
            OR: [
              {
                nickname: {
                  contains: query,
                },
              },
              {
                twitter: {
                  contains: query,
                },
              },
            ],
          },
          select: {
            id: true,
            nickname: true,
            twitter: true,
            updated_at: true,
            bio: true,
          },
          orderBy: {
            updated_at: 'desc',
          },
        });

        return res.status(200).json(cards);
      }

      default: {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json(`${req.method}는 허용되지 않습니다.`);
      }
    }
  });
}
