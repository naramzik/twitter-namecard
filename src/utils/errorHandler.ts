import type { NextApiRequest, NextApiResponse } from 'next';

export default async function errorHandler(req: NextApiRequest, res: NextApiResponse, fn: () => Promise<void>) {
  try {
    await fn();
  } catch (error) {
    console.log((error as Error).message, (error as Error).stack);
    res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
}
