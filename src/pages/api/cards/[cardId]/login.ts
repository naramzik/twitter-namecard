import { isEmpty } from 'lodash-es';
import errorHandler from '@/utils/errorHandler';
import prisma from '@/utils/prisma';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await errorHandler(req, res, async () => {
    const cardId = req.query.cardId as string;

    switch (req.method) {
      case 'POST': {
        const { password } = req.body;
        const { email } = await prisma.cards.findFirstOrThrow({
          where: {
            id: cardId,
          },
          select: {
            email: true,
          },
        });

        const { data: user, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || isEmpty(user.session)) {
          return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        return res.status(201).json({ access_token: user.session.access_token });
      }

      default: {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
      }
    }
  });
}
