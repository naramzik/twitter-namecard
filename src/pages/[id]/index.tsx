import NiceModal from '@ebay/nice-modal-react';
import axios from 'axios';
import Image from 'next/image';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import BottomSheet from '@/components/modal/BottomSheet';
import type { GetServerSidePropsContext } from 'next';
import type { CardType } from '@/types/cards';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { showToastSuccessMessage } from '@/utils/showToastMessage';

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
      <div className="flex justify-around">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-14 h-14 bg-white rounded-2xl">
            <Image onClick={handleShowBottomSheet} src="/share.png" width={20} height={20} alt="전달하기 이미지" />
          </div>
          <span className="text-sm">공유하기</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-14 h-14 bg-white rounded-2xl">
            <Image src="/download.png" width={20} height={20} alt="다운로드 이미지" />
          </div>
          <span className="text-sm">다운로드</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className=" flex justify-center items-center w-14 h-14 bg-white rounded-2xl">
            <Image
              onClick={() => router.push(`/${card.id}/login?mode=edit`)}
              src="/edit.png"
              width={20}
              height={20}
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
              width={20}
              height={20}
              alt="삭제 이미지"
            />
          </div>
          <span className="text-sm">삭제하기</span>
        </div>
      </div>
      <div>
        <div className="pt-5">
          <div className="text-lg pb-1 font-extrabold">SNS</div>
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
            <div className="flex gap-3">
              <Image src="/link.png" width={24} height={24} alt="블로그" />
              <div className="text-sm w-20">블로그</div>
              <CopyToClipboard
                text={`${card.socialMedia?.blog}`}
                onCopy={() => showToastSuccessMessage('블로그 아이디가 복사되었습니다!')}
              >
                <div className="cursor-pointer btn btn-xs">{card.socialMedia?.blog}</div>
              </CopyToClipboard>
            </div>
          </div>
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
