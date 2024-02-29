import axios from 'axios';
import errorHandler from '@/utils/errorHandler';
import supabase from '@/utils/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cardId = req.query.cardId as string;

  switch (req.method) {
    case 'GET':
      await errorHandler(req, res, async () => {
        const { data: foundCard, error } = await supabase.from('cards').select('*').eq('id', cardId).single();
        if (error) throw error;
        res.status(200).json({ foundCard });
      });
      break;

    case 'DELETE':
      await errorHandler(req, res, async () => {
        const { data: cardToDelete, error } = await supabase.from('cards').delete().eq('id', cardId).select();
        if (error) throw error;
        if (!cardToDelete) {
          return res.status(404).json({ message: '삭제할 명함을 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: '명함이 삭제되었습니다.' });
      });
      break;

    case 'PUT':
      await errorHandler(req, res, async () => {
        // const { data: updatedCard, error } = await supabase.from('cards').update(req.body).eq('id', cardId).select();

        const { customImage, twitterProfile, ...rest } = req.body;
        // 트위터 프로필 이미지일 떄,
        if (!customImage && twitterProfile) {
          const imageDownloadResponse = await axios.get(twitterProfile, {
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
          // 커스텀 이미지를 추가할 때
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
          .update({ image_url: imageUrl.publicUrl, ...rest })
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
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).json({ message: `${req.method}는 허용되지 않습니다.` });
      break;
  }
}

// case 'POST':
// await errorHandler(req, res, async () => {
//   const { customImage, cardId } = req.body;
//   if (!customImage) {
//     const imageDownloadResponse = await axios.get(image, {
//       responseType: 'arraybuffer',
//     });

//     const imageBuffer = Buffer.from(imageDownloadResponse.data, 'binary');

//     const { error: uploadError } = await supabase.storage.from('image_url').upload(cardId, imageBuffer, {
//       upsert: true,
//     });
//     if (uploadError) {
//       console.error('이미지 파일을 올릴 수 없습니다.:', uploadError);
//       return;
//     }
//   } else {
//     const { error: uploadError } = await supabase.storage.from('image_url').upload(cardId, customImage, {
//       upsert: true,
//     });
//     if (uploadError) {
//       console.error('이미지 파일을 올릴 수 없습니다.:', uploadError);
//       return;
//     }
//   }
