import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';
import CardForm from '@/components/card/CardForm';
import LayoutWithTitle from '@/components/layout/LayoutWithTitle';
import SEO from '@/components/SEO/SEO';
import { useCreateCard } from '@/hooks/queries/useCreateCard';
import { CardType } from '@/types/cards';

const Page = () => {
  const { push } = useRouter();
  const { isPending, mutateAsync } = useCreateCard();

  async function handleSubmit(data: CardType) {
    try {
      if (isPending) {
        return;
      }

      await mutateAsync(data);
      toast.success('카드가 성공적으로 생성되었어요.');
      push('/');
    } catch (error) {
      toast.error('카드 생성에 실패했어요.');
    }
  }

  return (
    <>
      <SEO title="트위터 명함 생성" description="나만의 트위터 명함을 만들어보세요." />
      <CardForm onSubmit={handleSubmit} />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutWithTitle title="명함 만들기">{page}</LayoutWithTitle>;
};

export default Page;
