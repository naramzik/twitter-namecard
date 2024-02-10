import { GetServerSidePropsContext } from 'next';
import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';

const Page = ({ cardId }: { cardId: string }) => {
  console.log('cardId front: ', cardId);
  return <CardForm cardId={cardId} />;
};

Page.getLayout = function getLayout(page) {
  return <LayoutWithTitle title="명함 수정하기">{page}</LayoutWithTitle>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cardId = context.params?.id;
  console.log('cardId: ', cardId);
  return {
    props: { cardId },
  };
};

export default Page;
