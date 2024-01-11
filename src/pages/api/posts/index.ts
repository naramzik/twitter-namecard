import { Database } from 'fakebase';
import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from '@/utils/errorHandler';
import { Entity } from '@/types/Entity';
interface PostType extends Entity {
  title: string;
  description: string;
}

const db = new Database('./data');
const Post = db.table<PostType>('posts');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const posts = await Post.findAll();
        res.status(200).json({ posts });
      });
      break;

    case 'POST':
      await errorHandler(req, res, async () => {
        const { title, description } = req.body;

        if (!title || !description) {
          return res.status(400).json({ message: '제목과 설명을 모두 입력해주세요.' });
        }

        const newPost = await Post.create({ title, description });
        res.status(201).json({ post: newPost });
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
