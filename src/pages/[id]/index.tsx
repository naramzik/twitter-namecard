import NiceModal from '@ebay/nice-modal-react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import BottomSheet from '@/components/modal/BottomSheet';
import type { GetServerSidePropsContext } from 'next';
import type { CardType } from '@/types/cards';

const Page = ({ card }: { card: CardType }) => {
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
      <div className="flex gap-3 items-center py-3">
        <div className="font-bold">{card.nickname}</div>
        <Image src="/download.png" width={25} height={25} alt="다운로드 이미지" />
      </div>
      <div className="flex justify-between">
        <button onClick={handleShowBottomSheet} className="btn w-48 flex justify-around btn-secondary">
          <Image src="/share.png" width={25} height={25} alt="전달하기 이미지" />
          <div className="text-sm">명함 전달하기</div>
        </button>
        <div className="flex justify-center items-center">
          <Link
            href={`/${card.id}/login?mode=edit`}
            className="w-16 btn-secondary flex flex-col justify-center items-center"
          >
            <Image src="/edit.png" width={25} height={25} alt="수정 이미지" />
            <div className="text-sm">수정하기</div>
          </Link>
          <Link
            href={`/${card.id}/login?mode=delete`}
            className="w-16 btn-secondary flex flex-col justify-center items-center"
          >
            <Image src="/delete.png" width={25} height={25} alt="삭제 이미지" />
            <div className="text-sm">삭제하기</div>
          </Link>
        </div>
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
