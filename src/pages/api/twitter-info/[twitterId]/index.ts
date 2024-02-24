import * as cheerio from 'cheerio';
import errorHandler from '@/utils/errorHandler';
import switchCrawler, { currentInstanceIndex, instanceUrls } from '@/utils/switchCrawler';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const twitterId = req.query.twitterId as string;
    if (!twitterId) {
      return res.status(400).json({
        message: '유저이름을 적어주세요.',
      });
    }

    const response = await switchCrawler(`/${twitterId}`);

    const html = response && response.data;
    const $ = cheerio.load(html);

    const bio = $(`.profile-bio`).text();
    const nickname = $(`.profile-card-fullname`).text();
    const image = `${instanceUrls[currentInstanceIndex]}${$('.profile-card-avatar').attr('href')}`;

    switch (req.method) {
      case 'GET':
        await errorHandler(req, res, async () => {
          res.status(200).json({
            bio,
            nickname,
            image,
          });
        });
        break;

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).json(`${req.method}는 허용되지 않습니다.`);
    }
  } catch (error) {
    if (error) {
      throw res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
  }
}
