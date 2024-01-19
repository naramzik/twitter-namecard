import { ReactNode } from 'react';
import BasicLayout from '@/components/layout/BasicLayout';

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <img src="/qr-code.png" alt="QR Code" width="70%" className="m-10" />
      <button type="button" className="btn w-3/5 h-10 bg-primary">
        이미지 다운로드
      </button>
    </div>
  );
};

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;

export default Page;
