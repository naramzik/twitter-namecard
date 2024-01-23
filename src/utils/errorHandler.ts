import type { NextApiRequest, NextApiResponse } from 'next';

export default async function errorHandler(req: NextApiRequest, res: NextApiResponse, fn: () => Promise<void>) {
  try {
    await fn();
  } catch (error) {
    res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    console.log(error);
  }
}
