import { ReactNode } from 'react';
import BasicLayout from '@/components/layout/BasicLayout';
import QRCode from '@/components/qrcode/QRCode';

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <QRCode className="p-10" />
      <button type="button" className="btn w-3/5 h-10 bg-primary">
        이미지 다운로드
      </button>
    </div>
  );
};

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;

export default Page;
