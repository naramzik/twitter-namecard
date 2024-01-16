import axios from 'axios';
import * as cheerio from 'cheerio';
import errorHandler from '@/utils/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nickname } = req.body;

  if (!nickname) {
    res.status(400).json({
      message: '유저이름을 적어주세요.',
    });
  }

  const url = `https://twitter.com/${nickname}`;
  return errorHandler(req, res, async () => {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1',
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const bio = $(`div[data-testid='UserDescription']`);

    console.log(bio[0]);
    // .attr('src');

    res.status(200).json({
      bio,
    });
  });
}
