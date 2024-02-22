import { ReactNode } from 'react';
import CardItem from '@/components/card/CardItem';
import LayoutWithHeader from '@/components/layout/LayoutWithHeader';
import { useGetCards } from '@/hooks/queries/useGetCards';
import type { CardType } from '@/types/cards';
import { showToastLoadingMessage, showToastSuccessMessage } from '@/utils/showToastMessage';

export default function Home() {
  const { cards, isLoading, isSuccess } = useGetCards();

  if (isLoading) showToastLoadingMessage('트위터 명함 목록을 불러오는 중이에요.');
  if (isSuccess) showToastSuccessMessage('트위터 명함 목록을 불러왔어요!');

  return (
    <div>
      <main className="flex flex-col gap-5 mx-1">{cards?.map((card: CardType) => <CardItem card={card} />)}</main>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => <LayoutWithHeader>{page}</LayoutWithHeader>;
