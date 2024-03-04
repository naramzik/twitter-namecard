import errorHandler from '@/utils/errorHandler';
import satori from 'satori';

import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageResponse } from 'next/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   const cardId = req.query.cardId as string;

  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const Nanum_Gothic_Buffer = await fetch(new URL('./NanumGothic-Regular.ttf', import.meta.url)).then(
          (response) => response.arrayBuffer(),
        );
        return new ImageResponse(
          (
            <div style={{ color: 'black', display: 'flex' }}>
              <h1>hello, world</h1>
              <h2>할로</h2>
            </div>
          ),
          {
            width: 600,
            height: 400,
            fonts: [{ name: 'Nanum_Gothic', data: Nanum_Gothic_Buffer, weight: 600 }],
          },
        );
        // return res.status(201).json({ result });
      });
      break;
    default:
  }
}
