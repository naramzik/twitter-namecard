import axios from 'axios';
import { isEmpty } from 'lodash-es';
import errorHandler from '@/utils/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

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

        const {
          data: { data },
        } = await axios.get(`https://api.twitter.com/2/users/by/username/${twitterId}`, {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
          },
          params: {
            'user.fields': 'name,description,username,profile_image_url',
          },
        });

        return res.status(200).json({
          bio: data.description,
          nickname: data.name,
          image: data.profile_image_url.replace('_normal', ''),
        });
      }

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).json(`${req.method}는 허용되지 않습니다.`);
    }
  });
}
