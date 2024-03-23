import NiceModal from '@ebay/nice-modal-react';
import Image from 'next/image';
import Link from 'next/link';
import randomColor from 'randomcolor';
import { ReactNode } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import BottomSheet from '@/components/modal/BottomSheet';
import { getTextColor } from '@/hooks/styles/getTextColor';
import prisma from '@/utils/prisma';
import { showToastSuccessMessage } from '@/utils/showToastMessage';
import type { GetServerSidePropsContext } from 'next';
import type { CardType } from '@/types/cards';

const Page = ({ card }: { card: CardType }) => {
  const handleShowBottomSheet = () => {
    NiceModal.show(BottomSheet, {
      nickname: card.nickname,
      cardId: card.id,
    });
  };

  return (
    <div className="mb-16">
      <h1 className="text-2xl font-bold">{card.nickname}</h1>
      <div className="flex justify-center h-1/4 py-3">
        <img
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cards/${card.id}/thumbnail`}
          className="w-full aspect-nameCard"
          alt="명함 이미지"
        />
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-12 h-12 bg-white rounded-2xl">
            <Image onClick={handleShowBottomSheet} src="/share.png" width={20} height={20} alt="전달하기 이미지" />
          </div>
          <span className="text-xs">공유하기</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-12 h-12 bg-white rounded-2xl">
            <Image src="/download.png" width={20} height={20} alt="다운로드 이미지" />
          </div>
          <span className="text-xs">다운로드</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Link
            href={`/card/${card.id}/login?mode=edit`}
            className=" flex justify-center items-center w-12 h-12 bg-white rounded-2xl"
          >
            <Image src="/edit.png" width={20} height={20} alt="수정 이미지" />
          </Link>
          <span className="text-xs">수정하기</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Link
            href={`/card/${card.id}/login?mode=delete`}
            className=" flex justify-center items-center w-12 h-12 bg-white rounded-2xl"
          >
            <Image src="/delete.png" width={20} height={20} alt="삭제 이미지" />
          </Link>
          <span className="text-xs">삭제하기</span>
        </div>
      </div>
      <div>
        <div className="pt-3">
          <div className="bg-white px-4 py-5 rounded-xl flex flex-col gap-1.5">
            <div className="flex gap-3">
              <Image src="/twitter.png" width={24} height={24} alt="트위터" />
              <div className="text-sm w-20">트위터</div>
              <CopyToClipboard
                text={`${card.twitter}`}
                onCopy={() => showToastSuccessMessage('트위터 아이디가 복사되었습니다!')}
              >
                <div className="cursor-pointer btn btn-xs">{card.twitter}</div>
              </CopyToClipboard>
            </div>
            {card.socialMedia?.instagram && (
              <div className="flex gap-3">
                <Image src="/instagram.png" width={24} height={20} alt="인스타그램" />
                <div className="text-sm w-20">인스타그램</div>
                <CopyToClipboard
                  text={`${card.socialMedia?.instagram}`}
                  onCopy={() => showToastSuccessMessage('인스타그램 아이디가 복사되었습니다!')}
                >
                  <div className="cursor-pointer btn btn-xs">{card.socialMedia?.instagram}</div>
                </CopyToClipboard>
              </div>
            )}
            {card.socialMedia?.github && (
              <div className="flex gap-3">
                <Image src="/github.png" width={24} height={24} alt="깃허브" />
                <div className="text-sm w-20">깃허브</div>
                <CopyToClipboard
                  text={`${card.socialMedia?.github}`}
                  onCopy={() => showToastSuccessMessage('깃허브 아이디가 복사되었습니다!')}
                >
                  <div className="cursor-pointer btn btn-xs">{card.socialMedia?.github}</div>
                </CopyToClipboard>
              </div>
            )}
            {card.socialMedia?.blog && (
              <div className="flex gap-3">
                <Image src="/link.png" width={24} height={24} alt="블로그" />
                <div className="text-sm w-20">블로그</div>
                <CopyToClipboard
                  text={`${card.socialMedia?.blog}`}
                  onCopy={() => showToastSuccessMessage('블로그 주소가 복사되었습니다!')}
                >
                  <div className="cursor-pointer btn btn-xs">{card.socialMedia?.blog}</div>
                </CopyToClipboard>
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
                <Image src="/twitter-blue-mark.png" width={24} height={24} alt="트위터 블루마크" />
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
                  <Image src="/twitter-blue-mark.png" width={24} height={24} alt="트위터 블루마크" />
                  <div className="font-bold">{field.key}</div>
                </div>
                <div className="text-sm">{field.contents}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const cardId = context.params?.cardId;
    const card = await prisma.cards.findFirstOrThrow({
      where: {
        id: cardId as string,
      },
    });
    return {
      props: {
        card: {
          ...card,
          updated_at: card.updated_at.toString(),
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
