import { ReactNode } from 'react';
import BasicLayout from '@/components/layout/BasicLayout';

const Page = () => {
  return (
    <>
      <div className="border-2 border-black aspect-nameCard">명함 컴포넌트</div>
      <div>필수 폼</div>
      <div>선택 폼</div>
      <button className="btn">저장하기</button>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;

export default Page;
