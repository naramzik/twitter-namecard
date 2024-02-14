import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';

const Page = () => {
  return <CardForm cardId={null} />;
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithTitle title="명함 만들기">{page}</LayoutWithTitle>;
};

export default Page;
