import axios from 'axios';
import * as cheerio from 'cheerio';
import errorHandler from '@/utils/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      await errorHandler(req, res, async () => {
        const { nickname } = req.body;
        if (!nickname) {
          return res.status(400).json({
            message: '유저이름을 적어주세요.',
          });
        }
        const USER_AGENT =
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1';
        const url = `${process.env.NITTER_HOST}/${nickname}`;
        const response = await axios.get(url, {
          headers: {
            'User-Agent': USER_AGENT,
          },
        });
        const html = response.data;
        const $ = cheerio.load(html);

        const bio = $(`.profile-bio`).text();
        const image = `${process.env.NITTER_HOST}${$('.profile-card-avatar').attr('href')}`;

        res.status(200).json({
          bio,
          image,
        });
      });
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
