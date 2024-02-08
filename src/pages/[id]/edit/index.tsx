import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';

const Page = () => {
  return <CardForm />;
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithTitle title="명함 수정하기">{page}</LayoutWithTitle>;
};

export default Page;
