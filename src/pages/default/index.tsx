import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-20">
      <Image src="/empty.png" alt="우주선" width={200} height={200} />
      <h1 className="text-xl font-bold">홈에서 명함을 선택해보세요! 👩‍🚀</h1>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};

export default Page;
