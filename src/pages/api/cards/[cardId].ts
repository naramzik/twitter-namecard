import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import axios from 'axios';
import { isEmpty } from 'lodash-es';
import errorHandler from '@/utils/errorHandler';
import prisma from '@/utils/prisma';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await errorHandler(req, res, async () => {
    const cardId = req.query.cardId as string;

    switch (req.method) {
      case 'GET': {
        try {
          const foundCard = await prisma.cards.findUniqueOrThrow({
            where: {
              id: cardId,
            },
          });

          return res.status(200).json(foundCard);
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError) {
            return res.status(404).json({ message: '명함을 찾을 수 없습니다.' });
          }

          throw e;
        }
      }

      case 'DELETE': {
        try {
          await prisma.cards.delete({
            where: {
              id: cardId,
            },
          });

          return res.status(200).json({ message: '명함이 삭제되었습니다.' });
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError) {
            return res.status(404).json({ message: '명함을 찾을 수 없습니다.' });
          }

          throw e;
        }
      }

      case 'PUT': {
        const {
          nickname,
          twitter,
          hashtags,
          socialMedia,
          customFields,
          customImage: customImageSrc = '',
          twitterProfile: twitterPicSrc = '',
        } = req.body;
        const { authorization } = req.headers;
        const [, token] = authorization?.split('Bearer ') ?? [];

        if (isEmpty(token)) {
          return res.status(401).json({ message: '로그인이 필요합니다.' });
        }

        const { data: userResponse, error: userError } = await supabase.auth.getUser(token);
        if (userError || isEmpty(userResponse)) {
          return res.status(401).json({ message: '로그인이 필요합니다.' });
        }

        if (userResponse.user.id !== cardId) {
          return res.status(403).json({ message: '본인의 명함만 수정할 수 있습니다.' });
        }

        // TODO: 이미지 업로드 로직을 함수로 분리
        let imageUrl = '';

        // 트위터 프로필 이미지일 때
        if (isEmpty(customImageSrc) && !isEmpty(twitterPicSrc)) {
          const {
            data,
            headers: { 'Content-Type': contentType },
          } = await axios.get(twitterPicSrc, {
            responseType: 'arraybuffer',
          });

          const buffer = Buffer.from(data, 'binary');
          const { error: uploadError, data: uploadResponse } = await supabase.storage
            .from('image_url')
            .upload(cardId, buffer, {
              contentType: (contentType as string | undefined) ?? 'image/png',
              upsert: true,
            });

          if (uploadError || isEmpty(uploadResponse)) {
            return res.status(500).json({ message: '이미지 파일을 업로드할 수 없습니다.' });
          }

          imageUrl = uploadResponse.path;
        }

        // 커스텀 프로필 이미지일 때
        if (!isEmpty(customImageSrc)) {
          imageUrl = customImageSrc;
        }

        await prisma.cards.update({
          where: {
            id: cardId,
          },
          data: {
            nickname,
            twitter,
            hashtags,
            socialMedia,
            customFields,
            image_url: imageUrl,
          },
        });

        return res.status(200).json({ message: '명함이 수정되었습니다.' });
      }

      default:
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
        return res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
    }
  });
}
