import LayoutWithHeader from '@/components/layout/LayoutWithHeader';

const Page = () => {
  return <>홈에서 명함을 선택해보세요!</>;
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithHeader>{page}</LayoutWithHeader>;
};

export default Page;
