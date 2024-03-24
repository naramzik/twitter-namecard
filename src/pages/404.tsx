import Image from 'next/image';
import { ReactNode } from 'react';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';

const Custom404 = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 h-[90vh]">
      <h1 className="text-4xl font-bold text-red-400">404 Error</h1>
      <div className="flex flex-col items-center">
        <Image src="/404.png" alt="404 error" width={150} height={150} />
        <div className="text-center mt-5">
          <p className="text-xl font-bold">페이지를 찾을 수 없습니다.</p>
          <p className="text-md mt-3 text-gray-700">
            존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

Custom404.getLayout = function getLayout(page: ReactNode) {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};

export default Custom404;
