import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-20 h-[90vh]">
      <Image src="/empty.png" alt="우주선" width={150} height={150} />
      <h1 className="text-xl font-bold">홈에서 명함을 선택해 보세요! 👩‍🚀</h1>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};

export default Page;
