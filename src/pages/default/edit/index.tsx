import { GetServerSidePropsContext } from 'next';
import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';

const Page = (cardId: string) => {
  return <CardForm cardId={cardId} />;
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithTitle title="명함 만들기">{page}</LayoutWithTitle>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cardId = context.params?.id;
  return {
    props: { cardId },
  };
};

export default Page;
