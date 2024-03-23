import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';
import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';
import { CardType } from '@/types/cards';
import prisma from '@/utils/prisma';

const Page = ({ card }: { card: CardType }) => {
  return <CardForm card={card} />;
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutWithTitle title="명함 수정하기">{page}</LayoutWithTitle>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const cardId = context.params?.id as string;
    const card = await prisma.cards.findUniqueOrThrow({
      where: {
        id: cardId,
      },
    });
    return {
      props: { card },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default Page;
