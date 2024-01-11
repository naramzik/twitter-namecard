import { Database } from 'fakebase';
import { Entity } from '../Entity';
import type { NextApiRequest, NextApiResponse } from 'next';
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
      try {
        const posts = await Post.findAll();
        res.status(200).json({ posts });
      } catch (error) {
        res.status(500).json({ message: '서버 에러가 발생했습니다.' });
      }
      break;

    case 'POST':
      try {
        const { title, description } = req.body;

        if (!title || !description) {
          return res.status(400).json({ message: '제목과 설명을 모두 입력해주세요.' });
        }

        const newPost = await Post.create({ title, description });
        res.status(201).json({ post: newPost });
      } catch (error) {
        res.status(500).json({ message: '서버 에러가 발생했습니다.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json(`${req.method}는 허용되지 않습니다.`);
  }
}
