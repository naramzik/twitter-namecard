import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';
import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';
import { useUpdateCard } from '@/hooks/queries/useUpdateCard';
import { CardType } from '@/types/cards';
import prisma from '@/utils/prisma';

const Page = ({ card }: { card: CardType }) => {
  const { push } = useRouter();
  const { mutateAsync: updateCard } = useUpdateCard();

  async function handleSubmit(data: CardType) {
    await toast.promise(
      updateCard({
        cardId: card.id,
        allData: data,
      }),
      {
        loading: '명함을 수정하는 중...',
        success: '명함을 성공적으로 수정했어요.',
        error: '명함 수정에 실패했어요.',
      },
    );
    push(`/card/${card.id}`);
  }

  return <CardForm card={card} onSubmit={handleSubmit} />;
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutWithTitle title="명함 수정하기">{page}</LayoutWithTitle>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const cardId = context.params?.cardId as string;
    const card = await prisma.cards.findUniqueOrThrow({
      where: {
        id: cardId,
      },
      select: {
        id: true,
        updated_at: false,
        nickname: true,
        twitter: true,
        socialMedia: true,
        customFields: true,
        hashtags: true,
        image_url: true,
        bio: true,
        email: true,
      },
    });
    return {
      props: { card },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default Page;
