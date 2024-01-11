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
  const postId = req.query.postId as string;
  const { title, description } = req.body;

  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: '포스트를 찾을 수 없습니다.' });
        }
        res.status(200).json({ post });
      });
      break;

    case 'DELETE':
      await errorHandler(req, res, async () => {
        const postToDelete = await Post.findById(postId);
        if (!postToDelete) {
          return res.status(404).json({ message: '삭제할 포스트를 찾을 수 없습니다.' });
        }
        await Post.delete(postId);
        res.status(200).json({ message: '포스트가 삭제되었습니다.' });
      });
      break;

    case 'PUT':
      await errorHandler(req, res, async () => {
        const postToUpdate = await Post.findById(postId);
        if (!postToUpdate) {
          return res.status(404).json({ message: '업데이트할 포스트를 찾을 수 없습니다.' });
        }
        const updatedPost = await Post.update({ id: postId, title, description });
        res.status(200).json({ post: updatedPost });
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
  }
}
