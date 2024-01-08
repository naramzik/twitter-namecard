import { Database } from 'fakebase';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  posts?: PostType[];
  post?: PostType;
  message?: string;
}

interface PostType {
  id: string;
  title: string;
  description: string;
}

const db = new Database('./data');
const Post = db.table('posts');

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      try {
        const posts = (await Post.findAll()) as PostType[];
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

        const newPost = (await Post.create({ title, description })) as PostType;
        res.status(201).json({ post: newPost });
      } catch (error) {
        res.status(500).json({ message: '서버 에러가 발생했습니다.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`${req.method}는 허용되지 않습니다.`);
  }
}
