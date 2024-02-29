import NiceModal from '@ebay/nice-modal-react';
import axios from 'axios';
import Image from 'next/image';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import BottomSheet from '@/components/modal/BottomSheet';
import type { GetServerSidePropsContext } from 'next';
import type { CardType } from '@/types/cards';
import { useRouter } from 'next/router';

const Page = ({ card }: { card: CardType }) => {
  const router = useRouter();

  const handleShowBottomSheet = () => {
    NiceModal.show(BottomSheet, {
      nickname: card.nickname,
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold">{card.nickname}</h1>
      <div className="flex justify-center h-1/4 py-5">
        <Image
          src="/card.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          alt="명함 이미지"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-14 h-14 bg-white rounded-2xl">
            <Image onClick={handleShowBottomSheet} src="/share.png" width={25} height={25} alt="전달하기 이미지" />
          </div>
          <span className="text-sm">공유하기</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-14 h-14 bg-white rounded-2xl">
            <Image src="/download.png" width={25} height={25} alt="다운로드 이미지" />
          </div>
          <span className="text-sm">다운로드</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-14 h-14 bg-white rounded-2xl">
            <Image
              onClick={() => router.push(`/${card.id}/login?mode=edit`)}
              src="/edit.png"
              width={25}
              height={25}
              alt="수정 이미지"
            />
          </div>
          <span className="text-sm">수정하기</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-14 h-14 bg-white rounded-2xl">
            <Image
              onClick={() => router.push(`/${card.id}/login?mode=delete`)}
              src="/delete.png"
              width={25}
              height={25}
              alt="삭제 이미지"
            />
          </div>
          <span className="text-sm">삭제하기</span>
        </div>
      </div>

      <div>
        <div className="pt-5 ">
          <div className="text-sm font-bold pb-1">소셜 미디어</div>
          <div className="text-lg">트위터: {card.twitter}</div>
          <div className="text-lg">인스타그램: {card.socialMedia?.instagram}</div>
          <div className="text-lg">깃허브: {card.socialMedia?.github}</div>
          <div className="text-lg">블로그: {card.socialMedia?.blog}</div>
        </div>
        <div className="pt-5 ">
          {card.customFields?.map((field, index) => (
            <div key={index} className="flex flex-col pb-5">
              <div className="text-sm font-bold pb-1">{field.key}</div>
              <div className="text-lg">{field.contents}</div>
            </div>
          ))}
        </div>
        {card.hashtags?.map((hashtag, index) => (
          <div key={index} className="pt-5">
            {hashtag}
          </div>
        ))}
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cardId = context.params?.id;
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards/${cardId}`);
  return {
    props: { card: data?.foundCard },
  };
};

export default Page;
