import { load } from 'cheerio';
import { isEmpty } from 'lodash-es';
import errorHandler from '@/utils/errorHandler';
import switchCrawler from '@/utils/switchCrawler';
import type { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'nodejs';
export const maxDuration = 300;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await errorHandler(req, res, async () => {
    switch (req.method) {
      case 'GET': {
        const twitterId = req.query.twitterId as string | undefined;
        if (isEmpty(twitterId)) {
          return res.status(400).json({
            message: '유저이름을 입력해주세요.',
          });
        }

        const { data, instanceUrl } = await switchCrawler(`/${twitterId}`);
        if (isEmpty(data)) {
          return res.status(500).json({
            message: '크롤링에 실패했습니다.',
          });
        }

        const $ = load(data);

        const bio = $(`.profile-bio`).text();
        const nickname = $(`.profile-card-fullname`).text();
        const image = `${instanceUrl}${$('.profile-card-avatar').attr('href')}`;

        return res.status(200).json({
          bio,
          nickname,
          image,
        });
      }

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).json(`${req.method}는 허용되지 않습니다.`);
    }
  });
}
