import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';
import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';

const Page = ({ cardId }: { cardId: string }) => {
  return <CardForm cardId={cardId} />;
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutWithTitle title="명함 수정하기">{page}</LayoutWithTitle>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cardId = context.params?.id;
  return {
    props: { cardId },
  };
};

export default Page;
