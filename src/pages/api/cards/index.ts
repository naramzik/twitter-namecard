import { nanoid } from 'nanoid';
import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';
import { isEmpty, isNull } from 'lodash-es';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await errorHandler(req, res, async () => {
    switch (req.method) {
      case 'GET': {
        const cards = await prisma.cards.findMany({
          select: {
            id: true,
            nickname: true,
            twitter: true,
            updated_at: true,
            bio: true,
          },
        });

        return res.status(200).json(cards);
      }

      case 'POST': {
        const {
          nickname,
          twitter,
          hashtags,
          socialMedia,
          customFields,
          password,
          customImage: customImageSrc = '',
          twitterProfile: twitterPicSrc = '',
        } = req.body;

        if (isEmpty(nickname)) {
          return res.status(400).json({ message: '닉네임을 적어주세요.' });
        }

        if (isEmpty(twitter)) {
          return res.status(400).json({ message: '트위터 아이디를 적어주세요.' });
        }

        if (isEmpty(password)) {
          return res.status(400).json({ message: '비밀번호를 적어주세요.' });
        }

        if (password.length < 6) {
          return res.status(400).json({ message: '비밀번호는 6자 이상으로 필수입니다.' });
        }

        const email = `${nanoid(12)}@example.com`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (!isEmpty(error) || isNull(data.user)) {
          return res.status(500).json({ message: '유저를 생성하지 못했습니다.' });
        }

        const userId = data.user.id;

        // TODO: 이미지 업로드 로직을 함수로 분리
        let imageUrl: string = '';

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
            .upload(userId, buffer, {
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

        const newCard = await prisma.cards.create({
          data: {
            id: userId,
            nickname,
            twitter,
            hashtags,
            socialMedia,
            customFields,
            image_url: imageUrl,
          },
        });

        res.status(201).json(newCard);
      }

      default: {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json(`${req.method}는 허용되지 않습니다.`);
      }
    }
  });
}
