import { Database } from 'fakebase';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  post?: PostType;
  message?: string;
}

type PostType = {
  id: string;
  title: string;
  description: string;
}

const db = new Database('./data');
const Post = db.table<PostType>('posts');

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { postId } = req.query;
  const { title, description } = req.body;

  switch (req.method) {
    case 'GET':
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: '포스트를 찾을 수 없습니다.' });
        }
        res.status(200).json({ post });
      } catch (error) {
        res.status(500).json({ message: '서버 에러가 발생했습니다.' });
      }
      break;

    case 'DELETE':
      try {
        const postToDelete = await Post.findById(postId);
        if (!postToDelete) {
          return res.status(404).json({ message: '삭제할 포스트를 찾을 수 없습니다.' });
        }
        await Post.delete(postId);
        res.status(200).json({ message: '포스트가 삭제되었습니다.' });
      } catch (error) {
        res.status(500).json({ message: '서버 에러가 발생했습니다.' });
      }
      break;

    case 'PUT':
      try {
        const postToUpdate = await Post.findById(postId);
        if (!postToUpdate) {
          return res.status(404).json({ message: '업데이트할 포스트를 찾을 수 없습니다.' });
        }
        const updatedPost = await Post.update({ id: postId, title, description });
        res.status(200).json({ post: updatedPost });
      } catch (error) {
        res.status(500).json({ message: '서버 에러가 발생했습니다.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
  }
}
