import { Database } from 'fakebase';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  post?: PostType;
  message?: string;
}

interface PostType {
  id: string;
  title: string;
  description: string;
}

const db = new Database('./data');
const Post = db.table<PostType>('posts');

const getPostById = async (postId: string) => {
  const post = await Post.findById(postId);
  return post;
};

const sendErrorResponse = (res: NextApiResponse<Data>, message: string, statusCode: number) => {
  res.status(statusCode).json({ message });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { postId } = req.query;
  const { title, description } = req.body;

  switch (req.method) {
    case 'GET':
      const post = await getPostById(postId as string);
      post ? res.status(200).json({ post }) : sendErrorResponse(res, '포스트를 찾을 수 없습니다.', 404);
      break;

    case 'DELETE':
      const postToDelete = await getPostById(postId as string);
      if (!postToDelete) {
        sendErrorResponse(res, '삭제할 포스트를 찾을 수 없습니다.', 404);
        return;
      }
      await Post.delete(postId as string);
      res.status(200).json({ message: '포스트가 삭제되었습니다.' });
      break;

    case 'PUT':
      const postToUpdate = await getPostById(postId as string);
      if (!postToUpdate) {
        sendErrorResponse(res, '업데이트할 포스트를 찾을 수 없습니다.', 404);
        return;
      }
      const updatedPost = await Post.update({ id: postId as string, title, description });
      res.status(200).json({ post: updatedPost });
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`${req.method}는 허용되지 않습니다.`);
  }
}
