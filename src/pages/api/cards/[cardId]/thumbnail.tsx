import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { CardType } from '@/types/cards';
import supabase from '@/utils/supabase';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: NextRequest) {
  const [pretendardBold, pretendardRegular] = await Promise.all([
    fetch(new URL('./Pretendard-Bold.woff', import.meta.url)).then((res) => res.arrayBuffer()),
    fetch(new URL('./Pretendard-Regular.woff', import.meta.url)).then((res) => res.arrayBuffer()),
  ]);

  const cardId = request.url.split('/')[5];
  const { data: foundCard } = await supabase.from('cards').select('*').eq('id', cardId).single();

  if (!foundCard) {
    return new Response(`Card not found`, {
      status: 404,
    });
  }

  const { data: image_url } = await supabase.storage.from('image_url').createSignedUrl(foundCard.image_url ?? '', 60);

  try {
    return new ImageResponse(
      (
        <div
          style={{
            boxSizing: 'border-box',
            width: 600,
            height: 350,
            background: 'white',
            padding: '2em',
            display: 'flex',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '2em', lineHeight: 1, fontWeight: 'bold' }}>{foundCard.nickname}</span>
              <span style={{ fontSize: '1em', lineHeight: 1 }}>@{foundCard.twitter ?? 'anonymous'}</span>
              {foundCard.bio && <span style={{ fontSize: '0.73em', marginTop: '0.5em' }}>"{foundCard.bio}"</span>}
            </div>
            {foundCard.hashtags && (
              <div
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5em', flexWrap: 'wrap', width: '300px' }}
              >
                {foundCard.hashtags.map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.25em 0.75em',
                      border: 'solid 1px black',
                      borderRadius: '500px',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'flex-end',
              maxWidth: 150,
            }}
          >
            <img
              src={image_url?.signedUrl ?? 'https://pbs.twimg.com/media/DKi8pCTUEAA6X-o?format=jpg&name=small'}
              width={120}
              height={120}
              alt=""
              style={{
                background: 'black',
                width: '120px',
                borderRadius: '50%',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25em' }}>
              {(foundCard.socialMedia as CardType['socialMedia'])?.instagram && (
                <div style={{ display: 'flex', gap: '0.5em' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <span style={{ width: '100px' }}>
                    @{(foundCard.socialMedia as CardType['socialMedia'])?.instagram}
                  </span>
                </div>
              )}
              {(foundCard.socialMedia as CardType['socialMedia'])?.github && (
                <div style={{ display: 'flex', gap: '0.5em' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="18">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                  <span style={{ width: '130px', wordBreak: 'break-all' }}>
                    @{(foundCard.socialMedia as CardType['socialMedia'])?.github}
                  </span>
                </div>
              )}
              {(foundCard.socialMedia as CardType['socialMedia'])?.blog && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5em' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16">
                    <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
                  </svg>
                  <span style={{ width: '170px', wordBreak: 'break-all' }}>
                    {(foundCard.socialMedia as CardType['socialMedia'])?.blog}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 600,
        height: 350,
        emoji: 'blobmoji',
        fonts: [
          {
            data: pretendardBold,
            name: 'Pretendard',
            weight: 700,
          },
          {
            data: pretendardRegular,
            name: 'Pretendard',
            weight: 400,
          },
        ],
      },
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
