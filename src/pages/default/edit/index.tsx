import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';
import { ReactNode } from 'react';

const Page = () => {
  return <CardForm cardId={null} />;
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutWithTitle title="명함 만들기">{page}</LayoutWithTitle>;
};

export default Page;
