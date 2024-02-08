import NiceModal from '@ebay/nice-modal-react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import BottomSheet from '@/components/modal/BottomSheet';
import type { GetServerSidePropsContext } from 'next';
import type { CardType } from '@/types/cards';

const Page = ({ card }: { card: CardType }) => {
  const path = `/${card.id}/login`;

  const handleShowBottomSheet = () => {
    NiceModal.show(BottomSheet);
  };

  return (
    <>
      <div className="flex justify-center h-1/4 ">
        <Image
          src="/card.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          alt="명함 이미지"
        />
      </div>
      <div className="flex justify-between items-center py-3">
        <div className="text-3xl font-bold">{card.nickname}</div>
        <div className="text-2xl ">{card.twitter}</div>
        <button className="btn w-7/12 btn-secondary">명함 이미지 다운로드</button>
      </div>
      <div className="flex justify-between">
        <button onClick={handleShowBottomSheet} className="btn w-5/12 btn-primary text-white">
          명함 전달하기
        </button>
        <Link href={path} className="btn w-5/12 btn-primary text-white">
          명함 수정하기
        </Link>
      </div>
      <div className="pt-5">
        {card.customFields?.map((field) => (
          <div key={card.twitter} className="flex flex-col pb-5">
            <div className="text-sm font-bold pb-1">{field.key}</div>
            <div className="text-lg">{field.contents}</div>
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
