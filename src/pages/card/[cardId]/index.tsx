import NiceModal from '@ebay/nice-modal-react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import randomColor from 'randomcolor';
import { ReactNode, useEffect } from 'react';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import BottomSheet from '@/components/modal/BottomSheet';
import SEO from '@/components/SEO/SEO';
import { useCreateShortLink } from '@/hooks/queries/useCreateShortLink';
import { getTextColor } from '@/hooks/styles/getTextColor';
import type { GetServerSidePropsContext } from 'next';
import type { CardType } from '@/types/cards';
const Page = ({ card }: { card: CardType }) => {
  const { mutate: createShortLink } = useCreateShortLink();

  const handleShowBottomSheet = () => {
    createShortLink(
      { cardId: card.id },
      {
        onSuccess: (data) => {
          NiceModal.show(BottomSheet, { card, shortLink: data[0].shortLink });
        },
      },
    );
  };

  useEffect(() => {
    localStorage.setItem('cardId', card.id);
  }, [card.id]);

  return (
    <>
      <SEO
        description={`${card.nickname}님의 명함을 둘러보세요.`}
        imageUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cards/${card.id}/thumbnail`}
      />
      <div className="mb-16">
        <h1 className="text-2xl font-bold">{card.nickname}</h1>
        <div className="flex justify-center h-1/4 py-3">
          <img
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cards/${card.id}/thumbnail?ts=${card.updated_at}`}
            className="w-full aspect-nameCard"
            alt={`${card.nickname}님의 명함 이미지`}
            style={{ width: '100rem', backgroundColor: 'white' }}
          />
        </div>
        <div className="flex justify-around">
          <button onClick={handleShowBottomSheet} className="flex flex-col justify-center items-center gap-2">
            <div className=" flex justify-center items-center w-12 h-12 bg-white rounded-2xl">
              <Image src="/images/share.png" width={20} height={20} alt="전달하기 이미지" />
            </div>
            <span className="text-xs">공유하기</span>
          </button>
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cards/${card.id}/thumbnail`}
            download={`${card.nickname}님의_명함.png`}
            className="flex flex-col justify-center items-center gap-2"
          >
            <div className=" flex justify-center items-center w-12 h-12 bg-white rounded-2xl">
              <Image src="/images/download.png" width={20} height={20} alt="다운로드 이미지" />
            </div>
            <span className="text-xs">다운로드</span>
          </a>
          <div className="flex flex-col justify-center items-center gap-2">
            <Link
              href={`/card/${card.id}/login?mode=edit`}
              className=" flex justify-center items-center w-12 h-12 bg-white rounded-2xl"
            >
              <Image src="/images/edit.png" width={20} height={20} alt="수정 이미지" />
            </Link>
            <span className="text-xs">수정하기</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Link
              href={`/card/${card.id}/login?mode=delete`}
              className=" flex justify-center items-center w-12 h-12 bg-white rounded-2xl"
            >
              <Image src="/images/delete.png" width={20} height={20} alt="삭제 이미지" />
            </Link>
            <span className="text-xs">삭제하기</span>
          </div>
        </div>
        <div>
          <div className="pt-3">
            <div className="bg-white px-4 py-5 rounded-xl flex flex-col gap-1.5">
              <div className="flex gap-3">
                <Image src="/images/twitter.png" width={24} height={24} alt="트위터" />
                <div className="text-sm w-12">트위터</div>
                <Link
                  href={`https://twitter.com/${card.twitter}`}
                  className="cursor-pointer btn btn-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card.twitter}
                </Link>
              </div>
              {card.socialMedia?.instagram && (
                <div className="flex gap-3">
                  <Image src="/images/instagram.png" width={24} height={20} alt="인스타그램" />
                  <div className="text-sm w-12">인스타</div>
                  <Link
                    href={`https://instagram.com/${card.socialMedia.instagram}`}
                    className="cursor-pointer btn btn-xs break-all max-w-52"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.socialMedia.instagram}
                  </Link>
                </div>
              )}
              {card.socialMedia?.github && (
                <div className="flex gap-3">
                  <Image src="/images/github.png" width={24} height={24} alt="깃허브" />
                  <div className="text-sm w-12">깃허브</div>
                  <Link
                    href={`https://github.com/${card.socialMedia.github}`}
                    className="cursor-pointer btn btn-xs break-all max-w-52"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.socialMedia.github}
                  </Link>
                </div>
              )}
              {card.socialMedia?.blog && (
                <div className="flex gap-3">
                  <Image src="/images/link.png" width={24} height={24} alt="블로그" />
                  <div className="text-sm w-12">블로그</div>
                  <Link
                    href={`https://${card.socialMedia.blog}`}
                    className="cursor-pointer btn btn-xs break-all max-w-52"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.socialMedia.blog}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {((card.hashtags && card.hashtags.length > 0) || (card.customFields && card.customFields.length > 0)) && (
            <div className="bg-white p-5 rounded-xl flex flex-col mt-3 gap-5">
              <div>
                <div className="flex flex-row gap-1">
                  <Image src="/images/twitter-blue-mark.png" width={24} height={24} alt="트위터 블루마크" />
                  <div className="font-bold">해시태그</div>
                </div>
                <div>
                  {card.hashtags?.map((hashtag, index) => {
                    const backgroundColor = randomColor({ hue: 'blue' });
                    const textColor = getTextColor(backgroundColor);
                    return (
                      <span
                        key={index}
                        className="rounded-lg px-2 py-1 mr-2 text-xs text-nowrap"
                        style={{ backgroundColor, color: textColor }}
                      >
                        {hashtag}
                      </span>
                    );
                  })}
                </div>
              </div>
              {card.customFields?.map((field, index) => (
                <div key={index}>
                  <div className="flex flex-row gap-1">
                    <Image src="/images/twitter-blue-mark.png" width={24} height={24} alt="트위터 블루마크" />
                    <div className="font-bold">{field.key}</div>
                  </div>
                  <div className="text-sm">{field.contents}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const cardId = context.params?.cardId;
    const card = await axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cards/${cardId}`);
    return {
      props: {
        card: {
          ...card.data.foundCard,
          updated_at: card.data.foundCard.updated_at.toString(),
        },
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default Page;
