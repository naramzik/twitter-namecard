import axios from 'axios';
import * as cheerio from 'cheerio';
import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import switchCrawler, { currentInstanceIndex, instanceUrls } from '@/utils/switchCrawler';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const twitterId = req.query.twitterId as string;
    if (!twitterId) {
      return res.status(400).json({
        message: '유저이름을 적어주세요.',
      });
    }

    const response = await switchCrawler(`/${twitterId}`);

    const html = response && response.data;
    const $ = cheerio.load(html);

    const bio = $(`.profile-bio`).text();
    const nickname = $(`.profile-card-fullname`).text();
    const image = `${instanceUrls[currentInstanceIndex]}${$('.profile-card-avatar').attr('href')}`;

    switch (req.method) {
      case 'GET':
        await errorHandler(req, res, async () => {
          res.status(200).json({
            bio,
            nickname,
            image,
          });
        });
        break;

      case 'POST':
        await errorHandler(req, res, async () => {
          const { customImage, cardId } = req.body;
          if (!customImage) {
            const imageDownloadResponse = await axios.get(image, {
              responseType: 'arraybuffer',
            });

            const imageBuffer = Buffer.from(imageDownloadResponse.data, 'binary');

            const { error: uploadError } = await supabase.storage.from('image_url').upload(cardId, imageBuffer, {
              upsert: true,
            });
            if (uploadError) {
              console.error('이미지 파일을 올릴 수 없습니다.:', uploadError);
              return;
            }
          } else {
            const { error: uploadError } = await supabase.storage.from('image_url').upload(cardId, customImage, {
              upsert: true,
            });
            if (uploadError) {
              console.error('이미지 파일을 올릴 수 없습니다.:', uploadError);
              return;
            }
          }

          // Supabase Storage에서 공개적으로 접근가능한 URL 생성하기
          const { data: imageUrl } = supabase.storage.from('image_url').getPublicUrl(cardId);
          //  Supbase Table에 저장하기
          const { data: updatedCard, error: updatedCardError } = await supabase
            .from('cards')
            .update({ image_url: imageUrl.publicUrl, bio, nickname })
            .eq('id', cardId)
            .select();

          if (updatedCardError) throw updatedCardError;
          if (!updatedCard || updatedCard.length === 0) {
            // 업데이트할 카드가 없는 경우
            return res.status(404).json({ message: '카드를 찾을 수 없습니다.' });
          }

          res.status(200).json({
            updatedCard,
          });
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json(`${req.method}는 허용되지 않습니다.`);
    }
  } catch (error) {
    if (error) {
      throw res.status(404).json({ message: '카드를 찾을 수 없습니다.' });
    }
  }
}
