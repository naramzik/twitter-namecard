import NiceModal from '@ebay/nice-modal-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BottomSheet from '@/components/modal/BottomSheet';

const Page = () => {
  const handleShowBottomSheet = () => {
    NiceModal.show(BottomSheet);
  };

  const router = useRouter();
  const query = router.query;
  const path = `/${query.id}/login`;
  const data = [
    {
      name: '자기소개',
      description: '안녕하세요. 저는 뫄뫄입니다.',
    },
    {
      name: '지뢰',
      description: '고양이 싫어하는 사람',
    },
  ];

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
      <div className="text-2xl pt-5 pb-2">김뫄뫄</div>
      <div className="flex justify-between">
        <button onClick={handleShowBottomSheet} className="btn w-5/12 btn-primary text-white">
          명함 전달하기
        </button>
        <button className="btn w-5/12 btn-primary text-white">명함 전달하기</button>
        <Link href={path} className="btn w-5/12 btn-primary text-white">
          s 명함 수정하기
        </Link>
      </div>
      <div className="pt-5">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col pb-5">
            <div className="text-sm font-bold pb-1">{item.name}</div>
            <div className="text-lg">{item.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default Page;
